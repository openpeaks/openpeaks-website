'use strict';

var config = require('./config');

module.exports = function(req, res, next) {
	var lang;

	var result = /^\/([a-z]{2})(\/|$|\?)/i.exec(req.originalUrl);
	if (result && result.length > 0) {
		lang = result[1];
	}

	if (!lang) {
		lang = 'en';
	}

	lang = lang.toLowerCase();

	if (config.supportedLanguages.indexOf(lang) < 0) {
		return res.redirect('/');
	}

	res.locals.lang = lang;
	next();
};
