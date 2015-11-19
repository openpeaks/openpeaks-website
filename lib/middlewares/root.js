'use strict';

var utils = require('../utils');
var links = require('../links');
var config = require('../config');
var util = {
	format: require('util').format,
	imageSrc: utils.imageSrc
};
var Data = require('../data').data;
var entipicUrl = require('entipic.url');
var shareButtons = require('../share_buttons');

function topicName(topic, lang) {
	var name = topic.name;
	if (lang && lang !== 'en') {
		name = topic.name[lang];
	}
	return name.common || name.official;
}

module.exports = function(req, res, next) {
	var lang = res.locals.lang;
	var __ = res.locals.__;

	res.locals.entipicUrl = entipicUrl;
	res.locals.topicName = topicName;
	res.locals.util = util;
	res.locals.site = {
		name: config.name,
		head: {
			title: __('project_title'),
			description: __('project_description')
		}
	};

	res.locals.config = config;
	res.locals.languages = Data.languages.getLanguages(lang);

	res.locals.shareButtons = shareButtons.getSocials(lang);

	var mainCategories = Data.categories.getRootCategories(lang);
	var pageMenu = mainCategories.map(function(category) {
		return {
			href: links.category(category.id, {
				lang: lang
			}),
			text: category.name
		};
	});

	res.locals.pageMenu = pageMenu;

	res.setSelectedCategory = function(category) {
		this.locals.selectedCategory = category;
		this.locals.contentTitle = this.locals.contentTitle || category.name;
	};

	res.setCanonical = function(url) {
		this.locals.site.head.canonical = 'http://' + config.host + url;
	};

	utils.maxage(res, 60);

	next();
};
