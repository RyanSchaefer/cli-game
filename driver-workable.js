window.onerror = function (error){
alert(error)
};
//Start up animation
function g_e(e){
	return document.getElementById(e);
};
animation_done = true;
class Main{
	constructor(){
		this.animations = [];
		this.tasks = [];
		this.context = {};
		this.path = "";
		self = this;
	}
	start_animating(){
		try{
			if (animation_done){
				g_e("input").onkeypress = function(event){return main.key_checker(event);};
				var y = this.animations.shift();
				y.func(y.args);
			}else{
				g_e("input").onkeypress = function(event){if(event.keyCode == 13){
				g_e("input").value = "";return false;}};
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
		g_e(object.element).style.display = "block";
		var interval = setInterval(function startFade(){
			g_e(object.element).style.opacity = fade;
			if(fade>1 && fadeOut == 0){
				fadeOut = 1;
			}
			else if(fade < 0){
				animation_done = true;
				fadeOut = 0;
				g_e(object.element).style.display = "none";
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
	animation_reboot(object){
		self.add_animation(self.clear_console, {});
		self.add_animation(self.animation_fade, {element:"startUp"});
		self.add_animation(self.plbl, {message:"initiliazing boot sequence............|reticulating squids....^^^^^^|dereticulating squids....^^^^^^|deregulating squids....^^^^^^|reregulating squids....^^^^^^|squids prepared...^^^^^^",element:"console", speed:75});
		self.add_animation(self.clear_console);
		self.add_animation(self.plbl, {message:"SquidOS.^^^^^^.^^^^^^.^^^^^^ Booted!^^^^^^^^^^^^^^", element:"console", speed:75})
		self.add_animation(self.clear_console, {});
		self.add_animation(self.plbl, {message:"Awating command. Type help for a list of commands.", speed:75, element:"console"});
	}
	command(input){
		if(input == "y"){
			if(!this.context.started){
				this.add_animation(this.animation_reboot, {});
				this.context.started = true;
			}
		}
		if(input == "help" && ){
			if(!this.context.first_reboot){
				this.add_animation(this.clear_console,{});
				this.add_animation(this.plbl, {element:"console", message:"List of avialable commands : ^^^^^^^^^^^^^^^||...||^^^^Well, hold on a second^^^^^|| Well this engine is incapable of percise seconds so give me say.^^^^.^^^^.^^^^ presicely 975 miliseconds to work this out.|||^^^^^^^^^^^^^Ok! We've gotten somewhere! | I just figured out something crucial to the playing of this game. Currently there aren't any commands to display! ^^^^^^^ Wait. ^^^^^^^ That can't be right.|| ^^^^^^^ Maybe turning it on and off again will fix this...", speed:75});
				this.add_animation(this.animation_reboot,{});
				this.context.first_reboot = true;
			}
			else if(this.context.first_reboot){
				this.add_animation(this.clear_console, {});
				this.add_animation(this.plbl, {element:"console", speed:75, message:"Ok^^^^^^^^^^^^^| Here goes second try..."});
			}
		}
	}
	get_input(){
		var x = g_e("input").value;
		g_e("input").value = "";
		return x;
	}
	clear_console(object){
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
main.start();
