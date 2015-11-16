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

var categoriesRegex = _.pluck(Data.data.categories.getCategories(), 'id').join('|');

route.get('/', function(req, res, next) {
	var lang = res.locals.lang;
	var __ = res.locals.__;

	utils.maxageIndex(res);

	res.locals.contentTitle = __('latest_articles');

	Promise.props({
			articles: Data.access.articles({
				where: {
					lang: lang
				},
				order: '-createdAt',
				limit: 12
			})
		}).then(function(result) {
			res.locals.site.head.canonical = links.home();
			res.render('index', result);
		})
		.catch(next);
});

route.get('/:category(' + categoriesRegex + ')', function(req, res, next) {
	var category = req.params.category.trim().toLowerCase();
	var lang = res.locals.lang;
	var __ = res.locals.__;

	utils.maxageCategory(res);

	category = Data.data.categories.getCategory(category, lang);

	res.setSelectedCategory(category);

	Promise.props({
			articles: Data.access.articles({
				where: {
					lang: lang,
					categories: {
						$in: [category.id]
					}
				},
				order: '-createdAt',
				limit: 12
			})
		}).then(function(result) {
			res.locals.site.head.title = util.format(__('page_title_by_category'), category.name);
			res.locals.site.head.description = util.format(__('page_description_by_category'), category.name);
			res.locals.site.head.canonical = links.category(category.id);
			res.render('index', result);
		})
		.catch(next);
});
