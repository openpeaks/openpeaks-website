'use strict';

var storage = require('openpeaks-articles-storage');

var connection = storage.connect(process.env.ARTICLES_STORAGE_CONNECTION);
var db = storage.db(connection);
var control = new storage.ControlService(db);
var access = new storage.AccessService(db);

exports.db = db;
exports.control = control;
exports.access = access;
exports.formatter = storage.formatter;

exports.close = function(cb) {
	console.log('---------------------');
	console.log('closing connection...');
	return connection.close(cb);
};
