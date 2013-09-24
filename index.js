"use strict";

var Binding = module.exports = function(dom){
	this.dom = dom;
};

Binding.prototype.$ = function(selector){
	return $(this.dom, selector);
};

Binding.prototype.apply = function(data){
	var nodes = this.$('[data-bind]');

	for (var i = 0; i < nodes.length; i++){
		this._applyNode(nodes[i], data);
	}

	return this;
};

Binding.prototype._applyNode = function(node, data){
	var property = node.getAttribute('data-bind');
	var attribute = node.getAttribute('data-bind-attr') || 'html';
	var _default = node.getAttribute('data-bind-default');

	var value = fromPath(data, property);
	if (value === null) value = _default;

	var setter = Binding.attributes[attribute];

	if (setter) setter(node, value);
	else node.setAttribute(attribute, value);
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
