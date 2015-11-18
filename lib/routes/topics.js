'use strict';

var express = require('express');
var utils = require('../utils');
var _ = utils._;
var Promise = utils.Promise;
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var Data = require('../data');
var links = require('../links');
var util = require('util');

route.get('/country/:id([\\w]{2})', function(req, res, next) {
	var lang = res.locals.lang;
	var __ = res.locals.__;
	var id = req.params.id.toLowerCase();

	utils.maxageTopic(res);

	var country = Data.data.topics.getCountry(id, lang);

	Promise.props({
			valueArticles: Data.access.articles({
				where: {
					lang: lang,
					type: 'value',
					topics: {
						$in: [country.id]
					}
				},
				order: '-createdAt',
				limit: 12
			}, {
				noCache: true
			}),
			topArticles: Data.access.articles({
				where: {
					lang: lang,
					type: 'top',
					topics: {
						$in: [country.id]
					}
				},
				order: '-createdAt',
				select: '_id title slug imageId countViews',
				limit: 5
			})
		}).then(function(result) {
			res.locals.site.head.canonical = links.country(id, {
				lang: lang
			});
			res.locals.country = country;
			res.render('country', result);
		})
		.catch(next);
});
