//window.onerror = function (error){
//alert(error);
//};
//Start up animation
function g_e(e){
	return document.getElementById(e);
};
animation_done = true;
class Main{
	constructor(){
		this.animations = [];
		this.tasks = [];
		this.context = "";
		this.path = "";
	}
	start_animating(){
		try{
			if (animation_done){
				var y = this.animations.shift();
				y.func(y.args);
			}
		}
		catch(e){}
	}
	add_animation(f, a){
		this.animations.push({func:f, args:a});
	}
	start_working(){
		try{
			var y = this.tasks.shift();
			y.func(y.args);
		}
		catch(e){}
	}
	add_task(f, a){
		this.tasks.push({func:f, args:a});
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
	animation_fade(object){
		animation_done = false;
		var fade = 0;
		var fadeOut = 0;
		var interval = setInterval(function startFade(){
			g_e(object.element).style.opacity = fade;
			if(fade>1 && fadeOut == 0){
				fadeOut = 1;
			}
			else if(fade < 0){
				animation_done = true;
				fadeOut = 0;
				clearInterval(interval);
			}
			else if(fadeOut == 0){
				fade = fade + 0.2;
			}
			else if(fadeOut == 1){
				fade = fade - 0.2;
			}
		}, 500);
	}
	plbl(object){
		animation_done = false;
		var element = document.getElementById(object.element);
		var i = 0;
		var interval = setInterval(function(){
			if (i<=object.message.length){
				if(object.message.charAt(i) == "|"){
					element.innerHTML += "<br>";
				}
				else if(object.message.charAt(i) == "^"){}
				else{
				element.innerHTML += object.message.charAt(i);
				}
				i++;
			}
			else{
				animation_done = true;
				clearInterval(interval);
			}
		}, object.speed);
	}
	command(input){
		if(input == "y"){
			if (this.context == ""){
				g_e("start").style.display = "none";
				g_e("startUp").style.display = "block";
				this.add_animation(this.animation_fade, {element:"startUp"});
				this.add_animation(function(){g_e("startUp").style.display = "none";});
				this.add_animation(this.plbl, {message:"initiliazing boot sequence............|reticulating squids....^^^^^^|dereticulating squids....^^^^^^|deregulating squids....^^^^^^|reregulating squids....^^^^^^|squids prepared...^^^^^^",element:"console", speed:75});
				this.add_animation(this.clear_console);
				this.add_animation(this.plbl, {message:"SquidOS.^^^^^^.^^^^^^.^^^^^^ booted!^^^^^^^^^^^^^^", element:"console", speed:75})
				this.add_animation(this.clear_console);
				this.add_animation(this.plbl, {message:"Awating command. Type help for a list of commands.", speed:75, element:"console"});
				this.context = "started";
			}
		}
		if(input == "help"){
			this.add_animation(this.clear_console);
			this.add_animation(this.plbl, {element:"console", message:"List of avialable commands : ^^^^|...|^^^^^^give me a sec.^^^^.^^^^^.^^^^^^^^^ ok  I got them.|^^^^^^^^ Oh dear, it seems that we forgot to add the commands...| ^^^^^^^^ Oh well, just looks like we will have to reboot.", speed:75});
			this.add_animation(function(){this.clear_console();g_e("startUp").style.display = "block"; this.animation_fade({element:"startUp"});})
		}
	}
	get_input(){
		var x = g_e("input").value;
		g_e("input").value = "";
		return x;
	}
	clear_console(){
		g_e("console").innerHTML = "";
	}
	key_checker(event){
		var key = event.keyCode;
		if (key == 13){
			this.command(this.get_input());
			return false;
		}
	}
	start(){
		var that = this;
		setInterval(function(){that.start_working();}, 1);
		setInterval(function(){that.start_animating();}, 1);
		this.animation_blink();
	}
}
alert("compiled");
main = new Main();
main.start()