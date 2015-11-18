'use strict';

var socialNames = {
	en: ['facebook', 'twitter', 'google'],
	ro: ['facebook', 'twitter', 'google']
};

exports.name = 'Openpeaks';
exports.languagePath = '/(:?' + ['ro'].join('|') + ')';
exports.getSocialNames = function(lang) {
	return socialNames[lang];
};
