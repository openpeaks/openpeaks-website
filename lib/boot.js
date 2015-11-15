'use strict';

module.exports = function(req, res, next) {
	var lang = process.env.LANGUAGE;
	if (!lang) {
		var result = /^([a-z]{2})\./i.exec(req.hostname);
		if (result && result.length > 0) {
			lang = result[1];
		}

		if (!lang) {
			return next(new Error('Invalid project language'));
		}
	}

	res.locals.lang = lang;
};
