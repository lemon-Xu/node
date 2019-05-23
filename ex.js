


function replace$(str, param){
	console.log("input:",str,"\n",param);
	let retStr = ""
	for(k in param) {
		let reg = "\\$\\{"+k+"\\}"
		let regExp = new RegExp(reg,'g');
		retStr = str.replace(regExp, param[k]);
		str = retStr;	
	}
	console.log("output:",retStr);
	return retStr;
}

function resolveLogic(str, param){
	let arrWord = str.trim().split(/\s+/);
	console.log("arrWord{arrWord}",arrWord);
	let logic = false;
	let operatorLogic = ["==", "!=", "&&", "||"];


	for(k in arrWord) {
		let regStr = /.+[^=!&|]+.+'/;
		let regLogic = /\(==|!=|&&|\|\|\)/;
		console.log(arrWord[k].match(regStr));
	}



	console.log(arrWord);
	console.log(arrWord[6].match(/'.+'/))


	return logic
}

function text1(){
	let p = {"user":"lemon","user2":"lemon3","password":123};
	let sql = replace$("select * from user where user == ${user} password = ${password}", p);	
}

function text2(){
	let p = " us=er !=    null && password != 'abc' ";
	let param = {"user": "lemon2"}
	resolveLogic(p,param);
}

text2()