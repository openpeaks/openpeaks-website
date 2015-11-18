'use strict';

var utils = require('../utils');
var Promise = utils.Promise;
var _ = utils._;
var Data = require('../data');

module.exports = function(req, res, next) {
	var lang = res.locals.lang;

	var props = {
		popularArticles: Data.access.articles({
			where: {
				lang: lang
			},
			order: '-countViews',
			select: '_id title slug imageId countViews',
			limit: 5
		}),
		latestTops: Data.access.articles({
				where: {
					lang: lang,
					type: 'top'
				},
				order: '-createdAt',
				select: '_id title slug imageId countViews',
				limit: 5
			})
			// totalArticles: Data.access.countArticles({
			// 	where: {
			// 		lang: lang
			// 	}
			// })
	};

	Promise.props(props)
		.then(function(result) {
			_.assign(res.locals, result);
			next();
		})
		.catch(next);
};
