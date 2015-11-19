'use strict';

var socialNames = {
	en: ['fb', 'tw', 'gp'],
	ro: ['fb', 'tw', 'gp'],
	ru: ['vk', 'fb', 'tw']
};

var socMap = {
	fb: {
		id: 'fb',
		name: 'Facebook',
		url: 'https://www.facebook.com/sharer/sharer.php?u=%URL'
	},
	gp: {
		id: 'gp',
		name: 'Google+',
		url: 'https://plus.google.com/share?url=%URL'
	},
	tw: {
		id: 'tw',
		name: 'Twitter',
		url: 'https://twitter.com/intent/tweet?text=%MESSAGE&url=%URL'
	},
	tu: {
		name: 'Tumblr',
		url: 'https://www.tumblr.com/share?v=3&u=%URL&t=%MESSAGE'
	},
	di: {
		name: 'Digg',
		url: 'http://digg.com/submit?partner=%WE&url=%URL&title=%MESSAGE'
	},
	re: {
		name: 'Reddit',
		url: 'http://www.reddit.com/submit?url=%URL&title=%MESSAGE'
	},
	vk: {
		id: 'vk',
		name: 'VKontakte',
		url: 'http://vk.com/share.php?url=%URL&title=%MESSAGE'
	},
	mr: {
		name: 'Mail.ru',
		url: 'http://connect.mail.ru/share?url=%URL&title=%MESSAGE'
	},
	de: {
		name: 'Delicious',
		url: 'https://delicious.com/post?partner=%WE&url=%URL&title=%MESSAGE'
	},
	gm: {
		name: 'GMail',
		url: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&to&su=%MESSAGE&body=%URL&ui=2&tf=1'
	},
	bl: {
		name: 'Blogger',
		url: 'https://www.blogger.com/blog_this.pyra?t&u=%URL&n=%MESSAGE'
	},
	lj: {
		name: 'LiveJournal',
		url: 'http://www.livejournal.com/update.bml?subject=%MESSAGE&event=%FUNC'
	},
	ba: {
		name: 'Baidu',
		url: 'http://cang.baidu.com/do/add?it=%MESSAGE&iu=%URL&fr=ien&dc='
	},
	am: {
		name: 'Amazon',
		url: 'http://www.amazon.com/gp/wishlist/static-add?u=%URL&t=%MESSAGE'
	},
	bi: {
		name: 'Bit.ly',
		url: 'https://bitly.com/a/bitmarklet?u=%URL'
	}
};

exports.getSocial = function(name) {
	return socMap[name];
};

exports.getNames = function(lang) {
	return socialNames[lang];
};

exports.getSocials = function(lang) {
	var socials = [];
	exports.getNames(lang).forEach(function(name) {
		socials.push(exports.getSocial(name));
	});
	return socials;
};
