'use strict';

var _ = require('lodash');
var Promise = require('bluebird');

var NO_CACHE = 'private, max-age=0, no-cache';
var PUBLIC_CACHE = 'public, max-age=';
var CACHE_CONTROL = 'Cache-Control';

/**
 * Set response Cache-Control
 * @maxage integet in minutes
 */
exports.maxage = function(res, maxage) {
	maxage = 0;
	var cache = NO_CACHE;
	if (maxage > 0) {
		cache = PUBLIC_CACHE + (maxage * 60);
	}
	res.set(CACHE_CONTROL, cache);
};

exports.maxageTopic = function(res) {
	exports.maxage(res, 60 * 6);
};

exports.maxageArticle = function(res) {
	exports.maxage(res, 60 * 1);
};

exports.maxageRedirect = function(res) {
	exports.maxage(res, 60 * 12);
};

exports.maxageIndex = function(res) {
	exports.maxage(res, 60);
};

exports.maxageCategory = function(res) {
	exports.maxage(res, 60 * 6);
};

exports.maxageSearch = function(res) {
	exports.maxage(res, 60 * 2);
};

exports.imageSrc = function(id, size) {
	id = id || '2015/a5520551e361a65a8ee0fc1b470015f.jpg';
	var src = '//s3.amazonaws.com/cdn.openpeaks.com/media/' + id;
	if (size) {
		var len = src.length;
		src = src.substr(0, len - 4) + '_' + size + src.substr(len - 4);
	}
	return src;
};

exports._ = _;
exports.Promise = Promise;
exports.logger = console;
