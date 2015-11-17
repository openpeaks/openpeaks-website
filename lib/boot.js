'use strict';

module.exports = function(req, res, next) {
	var lang;

	var result = /^\/([a-z]{2})(\/|$|\?)/i.exec(req.originalUrl);
	if (result && result.length > 0) {
		lang = result[1];
	}

	if (!lang) {
		// return next(new Error('Invalid project language'));
		lang = 'en';
	}

	res.locals.lang = lang.toLowerCase();
	next();
};
