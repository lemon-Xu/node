// HandlerMapping
const fs = require('fs');

var mapJson = ""
var dev = true;
const DBUGS = "DBUG HandlerMapping "

function getMapping() {
	let Maping = fs.readFileSync('./Maping.json');
	mapJson = JSON.parse(Maping);

	if(dev) {
		color("getMapping() 解析完成 mapJson:\n");
		console.log(mapJson);
	}
};

function getHandler(url){
	let url2 = url;
	if(dev)
		color("getHandler(url) url:handler"+url+":"+mapJson[url]);
	console.log(mapJson[url] || "fileServer");
	return mapJson[url] || "fileServer";
}

function DBUG(){
	dev = true;
}

function color(text){
	console.log("\033[40;31m",DBUGS,text,"\033[42;0m")
}

// 解析Mapping.json文件，解析后的json常驻内存
getMapping();

exports.getHandler = getHandler;
exports.DBUG = DBUG;