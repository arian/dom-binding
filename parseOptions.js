"use strict";

function parseOptions(value){
	if (!(/[:,]/.test(value))){
		return value;
	}

	var results = {};
	var length = value.length;
	var level = 0;
	var what = 0;
	var j;
	var key;
	var str;

	for (var i = 0; i < length; i++){
		// skip whitespace
		while (i < length && /[\s]/.test(value[i])) i++;

		if (what === 0){ // key
			j = value.indexOf(':', i);
			if (j == -1) break; // can't find any keys anymore
			key = value.slice(i, j);
			i = j;
			what = 1;

		} else if (what === 1){ // value

			if (value[i] == '{'){
				// it's an object, find closing bracket
				j = i;
				while (j++ < length - 1){
					if (value[j] == '{') level++;
					if (value[j] == '}' && level-- === 0){
						var objString = value.slice(i + 1, j);
						results[key] = parseOptions(objString);
						break;
					}
				}
				i = j + 1;
				level = 0;
			} else if (value[i] == '"'){
				// quoted value
				i++;
				str = value[i];
				j = i;
				while (j++ < length - 1){
					if (value[j] == '"') break;
					if (value[j] == '\\' && value[j + 1] == '"'){
						// escaped ", so like \"
						str += '"';
						j++;
					} else {
						str += value[j];
					}
				}
				i = j + 1;
				results[key] = str;
			} else {
				// unquoted value
				str = value[i];
				j = i;
				while (j++ < length - 1){
					if (value[j] == ',') break;
					str += value[j];
				}
				i = j;
				results[key] = str;
			}
			what = 0;
		}
	}

	return results;
}

module.exports = parseOptions;
