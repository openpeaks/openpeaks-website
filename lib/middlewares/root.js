'use strict';

var packageInfo = require('../../package.json');
var utils = require('../utils');
var config = require('../config');
var util = {
	format: require('util').format
};

module.exports = function(req, res, next) {

	res.locals.util = util;
	res.locals.site = {
		name: config.name,
		head: {
			title: config.name
		}
	};

	res.locals.project = {
		version: packageInfo.version,
		name: config.name
	};

	utils.maxage(res, 60);

	next();
};
