var input ="";
var level = 0;
var startUp = 0;
var animationDone = 0;
var level = 0;
//Start up animation

function fadeInOut(element){
var fade = 0;
var fadeOut = 0;
var interval = setInterval(function startFade(){
	document.getElementById(element).style.opacity = fade;
	if(fade>1 && fadeOut == 0){
	fadeOut = 1;
	}
	else if(fade < 0){
	clearInterval(interval)
	}
	else if(fadeOut == 0){
	fade = fade + .2;
	}
	else if(fadeOut == 1){
	fade = fade - .2;
	}
}, 500)
}




function checkKey(event) {
var code = event.keyCode;
if (code == 13) {
//get input and clear box
		input = document.getElementById("input").value;
		document.getElementById("input").value="";
		if (startUp == 0 && input == "y"){
		document.getElementById("startUp").style.display="block";
		document.getElementById("start").style.display="none";
		fadeInOut("startUp");
		startUp = 1;
		setTimeout(function (){animationDone = 1; document.getElementById("startUp").style.display = "none"; writeToConsole("Type level and level number to go to that level:<br> level 1 - unlocked")}, 7000)
		}
		else if (startUp == 1 && animationDone == 1){
			if( level == 0 && input=="help"){
				writeToConsole("<pre>Basic Menu Help [This help menu lists all commands for the basic menu]<br>levels                        - view list of levels <br>level 1/2/3...                - type level and the level's number to go to that level<br>credits                       - view information on who made this game <br>i have no idea what i'm doing - help with what game is about<br>game about                    - help with what this game is about<br>help                          - view this menu</pre>")
			}
			else if(level == 0 && input == "game about" || input== "i have no idea what i'm doing"){
				writeToConsole("SquidS is a mock hacker game. In each level you are presented with a puzzle you must solve to the password. In the start of the game the system admins are careless and have coded in ways to veiw the password in case they forget them. The admins, however, will put increased security on any way you find in so that next level will always be harder.")
			}
			else if(level == 0 && input == "credits"){
				writeToConsole("The person who made this game is squid dev, a nub programmer who makes idle / puzzle games in his free time. If you want to donate to help out go here : ");
			}
			//LEVELS GO IN HERE
			else if(level == 0 && input == "levels"){
				writeToConsole("level 1 - unlocked");
			}
			else if(level == 0 && input == "level 1"){
				writeToConsole("Level 1 Loaded......")
				setTimeout(function (){
				document.getElementById("console").innerHTML="";
				plbl("console" ,"SquidS iterration 1 boot sequence initialized....                    |File system.... loaded|", 20);}
				, 1000)
			}
			//level 1
			
		//INVALID COMMAND ERROR
			else{
			writeToConsole("Invalid command type \"help\" for a list of commands.")
			}
		}
		else{}
		// auto scroll to bottom
		var objDiv = document.getElementById("console");
		objDiv.scrollTop = objDiv.scrollHeight;
		return false;
	}
}
//basic write to console
function writeToConsole(message){
document.getElementById("console").innerHTML+= "<p>"+message+"</p>"
}

//> blink
var blink = 0;
window.setInterval(function blinking(){
if (blink == 0){
document.getElementById("blinker").innerHTML = ">"
blink= 1;
}
else if(blink == 1){
document.getElementById("blinker").innerHTML="&nbsp;"
blink = 0;
}
}, 1000)

// print letter by letter
function plbl(destination, message, speed){
	var p = plbl.intervals;
	if (!p)
		plbl.intervals = p = {};

	if (p[destination])
		clear();

	function clear() {
		clearInterval(p[destination]);
		delete p[destination];
	}

	var i = 0;
	var elem = document.getElementById(destination);
	p[destination] = setInterval(function(){
		checkChar = message.charAt(i);
		if(checkChar =="|"){
		elem.innerHTML += "<br>"
		}
		else{
		elem.innerHTML += message.charAt(i);
		}
		i++;
		if (i > message.length){
			clear();
		}
	}, speed);
}

function addLbLbreak(message, speed, extraWait){
var waitTime = message.length * speed;
waitTime = waitTime + extraWait + 100;
setTimeout(function(){
writeToConsole("")
alert("test")
}, waitTime)
}
