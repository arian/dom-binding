
mocha.setup('bdd');

require('./Binding');
require('./parseOptions');

window.onload = function(){
	mocha.run();
};
