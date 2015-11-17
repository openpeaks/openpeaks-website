'use strict';

var express = require('express');
var utils = require('../utils');
var Promise = utils.Promise;
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var Data = require('../data');
var links = require('../links');

route.get('/view/article/:id/:time', function(req, res, next) {
	var time = req.params.time.trim().toLowerCase();
	var id = req.params.id.trim().toLowerCase();
	utils.maxage(res, 0);

	time = time - Date.now();
	time = Math.abs(time);

	if (time > 1000 * 4) {
		return res.sendStatus(400);
	}

	Data.control.updateArticle({
			id: id,
			$inc: {
				countViews: 1
			}
		}).then(function(article) {
			res.sendStatus(article ? 200 : 404);
		})
		.catch(next);
});
