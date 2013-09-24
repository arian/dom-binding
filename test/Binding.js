"use strict";

var expect = require('expect.js');
var Binding = require('../');

var gEBID = function(id){
	return document.getElementById(id);
};

describe('Binding', function(){

	it('should bind some object values to a simple HTML', function(){
		var bind = new Binding(gEBID('test'));
		bind.apply({
			title: 'Who Moved My Cheese?',
			book: {
				author: 'Spencer Johnson',
				pages: 96
			}
		});

		expect(gEBID('bind-title').innerHTML).to.be('Who Moved My Cheese?');
		expect(gEBID('bind-author').innerHTML).to.be('Spencer Johnson');
		expect(gEBID('bind-year').innerHTML).to.be('1998');
		expect(gEBID('bind-pages').innerHTML).to.be('x');
		expect(gEBID('bind-pages').getAttribute('title')).to.be('96');
	});

});
