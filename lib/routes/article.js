'use strict';

var express = require('express');
var utils = require('../utils');
var Promise = utils.Promise;
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var Data = require('../data');
var links = require('../links');

route.get('/article/:slug.html', function(req, res, next) {
	var lang = res.locals.lang;
	var slug = req.params.slug.trim().toLowerCase();
	var id = Data.formatter.createArticleId({
		lang: lang,
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
				return res.redirect(links.home({
					lang: lang
				}));
			}

			res.locals.actionUrl = ['/_actions/view/article', id, Date.now()].join('/');

			res.locals.site.head.title = result.article.title;
			res.locals.site.head.description = result.article.headline;
			res.setCanonical(links.article(slug, {
				lang: lang
			}));
			if (result.article.type === 'value' && result.article.countItems > 20) {
				res.render('wide_article', result);
			} else {
				res.render('article', result);
			}
		})
		.catch(next);
});
