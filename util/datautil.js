var fs = require('fs');
var path = require('path');

var dataPath = 'data/'

function readData(){
	var scriptName = path.basename(module.parent.filename);
	var filePath = dataPath + scriptName.split(".")[0] + '/data.json';
	try{
	var data = fs.readFileSync(filePath, 'utf8');
	} catch(err){
		throw 'Please make sure that the file ' + filePath + ' exist!';
	}
	//console.log('read the data ' + data);
	return JSON.parse(data);
}

function writeToFile(fileName, data){
	fs.writeFile(fileName, data + "\n", function(err){
	});
}

function appendToFile(fileName, data){
	fs.appendFile(fileName, data + "\n", function(err){
	})
}

exports.readData = readData;
exports.writeToFile = writeToFile;
exports.appendToFile = appendToFile;