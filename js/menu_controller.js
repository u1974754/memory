

function phaser_game(){
	loadpage("./html/phasergame.html");
}

function phaser_game2(){
	loadpage("./html/phasergame2.html");
}

function puntuaciones(){
	loadpage("./html/puntuaciones.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
}

function exitmenu(){
	loadpage("../index.html")
}

function options(){
	loadpage("./html/options.html");
}

function load(){
	loadpage("./html/load.html");
}


