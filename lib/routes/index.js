'use strict';

module.exports = function(app) {
	app.use(require('../middlewares/root.js'));
	app.use(require('../middlewares/articles.js'));
	app.use(require('./home.js'));
	app.use(require('./article.js'));
};
