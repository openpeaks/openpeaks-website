'use strict';

var config = require('../config');
var home = require('./home');
var article = require('./article');
var topics = require('./topics');

module.exports = function(app) {
	app.use('/_actions', require('./_actions'));
	app.use(require('../middlewares/root.js'));
	app.use(require('../middlewares/articles.js'));
	app.use(config.languagePath, home);
	app.use(home);
	app.use(config.languagePath, article);
	app.use(article);
	app.use(config.languagePath, topics);
	app.use(topics);
};
