'use strict';

var packageInfo = require('../package.json');

exports.version = packageInfo.version;
exports.host = 'openpeaks.com';
exports.name = 'Openpeaks';
exports.languagePath = '/(:?' + ['ro'].join('|') + ')';
exports.supportedLanguages = ['en', 'ro'];
