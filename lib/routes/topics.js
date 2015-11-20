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
			topicArticles: Data.access.articles({
				where: {
					lang: lang,
					topics: {
						$in: [country.id]
					}
				},
				order: '-createdAt',
				limit: 12
			}, {
				noCache: true
			})
		}).then(function(result) {
			var topicName = res.locals.topicName;
			res.locals.site.head.title = util.format(__('page_title_by_category'), topicName(country));
			res.locals.site.head.description = util.format(__('page_description_by_category'), topicName(country));
			res.locals.site.head.canonical = links.country(id, {
				lang: lang
			});
			res.locals.country = country;
			res.render('country', result);
		})
		.catch(next);
});
