var outPut = require('../util/output');
function Page(){
}

Page.prototype.open = function(path){
	outPut.log('opening the page ' + path);
	browser.url(path);
}

module.exports = new Page();