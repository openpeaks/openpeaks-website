'use strict';

var express = require('express');
var utils = require('../utils');
var Promise = utils.Promise;
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var Data = require('../data');
var links = require('../links');

route.get('/article/:slug.html', function(req, res, next) {
	var slug = req.params.slug.trim().toLowerCase();
	var id = Data.formatter.createArticleId({
		lang: res.locals.lang,
		slug: slug
	});
	utils.maxageArticle(res);

	Promise.props({
			article: Data.access.article({
				where: {
					_id: id
				}
			}),
			articleText: Data.access.articleText({
				where: {
					_id: id
				}
			})
		}).then(function(result) {
			if (!result.article) {
				return res.redirect(links.home());
			}
			res.locals.site.head.title = result.article.title;
			res.locals.site.head.description = result.article.headline;
			res.locals.site.head.canonical = links.article(slug);
			if (result.article.type === 'value') {
				res.render('wide_article', result);
			} else {
				res.render('article', result);
			}
		})
		.catch(next);
});
