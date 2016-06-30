var animationDone = true;
//Start up animation
function g_e(e){
	return document.getElementById(e);
}
class Main{
	constructor(){
		this.animations = [];
		this.tasks = [];
	}
	start_animating(){
		var x = setInterval(function (){
			if (animationDone === true){
				try{
					this.aminations[0]();
					this.animations.shift();
				}
				catch(e){
				}
			}
		},1);}
	start_working(){
		var x = setInterval(function (){
			try{
				this.tasks[0]();
				this.tasks.shift();
			}
			catch(e){
			}
		},1);
	}
	animation_blink(){
		var blink = 0;
		window.setInterval(function blinking(){
			if (blink == 0){
				document.getElementById("blinker").innerHTML = ">";
				blink= 1;
			}
			else if(blink == 1){
				document.getElementById("blinker").innerHTML="&nbsp;";
				blink = 0;
			}
		}, 1000);
	}
	animation_fade(element){
		var fade = 0;
		var fadeOut = 0;
		animationDone = false;
		var interval = setInterval(function startFade(){
			document.getElementById(element).style.opacity = fade;
			if(fade>1 && fadeOut == 0){
				fadeOut = 1;
			}
			else if(fade < 0){
				clearInterval(interval);
			}
			else if(fadeOut == 0){
				fade = fade + 0.2;
			}
			else if(fadeOut == 1){
				fade = fade - 0.2;
			}
		}, 500);
		animationDone = true;
	}
	animation_plbl(destination, message, speed){
		animationDone = false;
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
				elem.innerHTML += "<br>";
			}
			else{
				elem.innerHTML += message.charAt(i);
			}
			i++;
			if (i > message.length){
				animationDone = true;
				clear();
			}
		}, speed);
	}
	command(input){
		
	}
	get_input(){
		var x = g_e("input").value;
		g_e("input").value = "";
		return x;
	}
	key_checker(event){
		var key = event.KeyCode;
		if (key == 13){
			console.log(get_input());
		}
	}
	start(){
		this.start_working();
		this.start_animating();
		this.animation_blink();
	}
}
main = new Main()
main.start()
