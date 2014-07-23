"use strict";

var parseOptions = require('./parseOptions');

var Binding = module.exports = function(dom){
	this.dom = dom;
};

Binding.prototype.$ = function(selector){
	return Binding.$(this.dom, selector);
};

Binding.prototype.apply = function(data){
	var nodes = this.$('[data-bind]');

	for (var i = 0; i < nodes.length; i++){
		this._applyNode(nodes[i], data);
	}

	return this;
};

Binding.prototype._applyNode = function(node, data){
	var properties = parseOptions(node.getAttribute('data-bind'));
	var options = parseOptions(node.getAttribute('data-bind-options'));

	if (typeof properties == 'string'){
		properties = {html: properties};
	}

	for (var property in properties){
		var value = fromPath(data, properties[property]);
		if (value == null && options && options.defaults && options.defaults[property]){
			value = options.defaults[property];
		}
		if (value == null) continue;

		var setter = Binding.attributes[property];

		if (setter) setter(node, value);
		else node.setAttribute(property, value);
	}

};

Binding.attributes = {
	html: function(node, value){
		node.innerHTML = value;
	}
};

var $ = Binding.$ = function(dom, selector){
	return dom.querySelectorAll(selector);
};

function fromPath(source, parts){
	if (typeof parts == 'string') parts = parts.split('.');
	for (var i = 0, l = parts.length; i < l; i++){
		if (source.hasOwnProperty(parts[i])) source = source[parts[i]];
		else return null;
	}
	return source;
}
