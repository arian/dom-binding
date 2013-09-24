
mocha.setup('bdd');

require('./Binding');

window.onload = function(){
	mocha.run();
};
