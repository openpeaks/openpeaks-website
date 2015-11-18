'use strict';

var storage = require('openpeaks-articles-storage');
var Data = require('openpeaks-data');

var connection = storage.connect(process.env.ARTICLES_STORAGE_CONNECTION);
var db = storage.db(connection);
var control = new storage.ControlService(db);
var access = new storage.CacheAccessService(db);

exports.db = db;
exports.control = control;
exports.access = access;
exports.formatter = storage.formatter;
exports.data = Data;

exports.close = function(cb) {
	console.log('---------------------');
	console.log('closing connection...');
	return connection.close(cb);
};
