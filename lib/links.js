'use strict';

var urlset = require('urlset');
var path = require('path');

urlset.load(path.join(__dirname, 'sitemap.json'));

urlset.setParam({
	name: 'lang',
	value: 'en',
	format: 's'
});

module.exports = urlset.url;
