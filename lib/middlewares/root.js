'use strict';

var packageInfo = require('../../package.json');
var utils = require('../utils');
var links = require('../links');
var config = require('../config');
var util = {
	format: require('util').format
};
var Data = require('../data').data;

module.exports = function(req, res, next) {
	var lang = res.locals.lang;
	var __ = res.locals.__;

	res.locals.util = util;
	res.locals.site = {
		name: config.name,
		head: {
			title: __('project_title'),
			description: __('project_description')
		}
	};

	res.locals.project = {
		version: packageInfo.version,
		name: config.name
	};


	var mainCategories = Data.categories.getRootCategories(lang);
	var pageMenu = mainCategories.map(function(category) {
		return {
			href: links.category(category.id),
			text: category.name
		};
	});

	res.locals.pageMenu = pageMenu;

	res.setSelectedCategory = function(category) {
		this.locals.selectedCategory = category;
		this.locals.contentTitle = this.locals.contentTitle || category.name;
	};

	utils.maxage(res, 60);

	next();
};
