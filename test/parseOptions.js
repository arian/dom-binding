"use strict";

var expect = require('expect.js');
var parse = require('../parseOptions');

describe('parseOptions', function(){

	it('should return the string if it is not an object type', function(){
		expect(parse('abc')).to.be('abc');
	});

	it('should return an object when the key and value are separated by a :', function(){
		expect(parse('abc:xyz')).to.eql({abc: 'xyz'});
		expect(parse('abc: xyz')).to.eql({abc: 'xyz'});
	});

	it('should return an object with multiple values separated by a comma', function(){
		expect(parse('abc:xyz,bar:foo')).to.eql({abc: 'xyz', bar: 'foo'});
		expect(parse('abc: xyz, bar: foo')).to.eql({abc: 'xyz', bar: 'foo'});
	});

	it('should return an object where the value is quoted', function(){
		expect(parse('abc: "hi,like:things"')).to.eql({abc: 'hi,like:things'});
		expect(parse('abc: "hi,like\\"things"')).to.eql({abc: 'hi,like"things'});
		expect(parse('abc: "hi,like\\"things",x:1')).to.eql({abc: 'hi,like"things', x: 1});
	});

  it('should parse nested objects', function(){
		expect(parse('abc:{xyz:1}')).to.eql({abc: {xyz: 1}});
		expect(parse('abc:{xyz:1},bcd:2')).to.eql({abc: {xyz: 1}, bcd: 2});
		expect(parse('abc:{xyz:1},bcd:{foo: 2},y: 3')).to.eql({abc: {xyz: 1}, bcd: {foo: 2}, y: 3});
		expect(parse('abc:{xyz:1},bcd:{foo: 2,y: 3}')).to.eql({abc: {xyz: 1}, bcd: {foo: 2, y: 3}});
		expect(parse('abc:{xyz:1,bcd:{foo: 2,y: 3}}')).to.eql({abc: {xyz: 1, bcd: {foo: 2, y: 3}}});
	});

});
