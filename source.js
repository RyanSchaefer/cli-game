// (C) 2016 Ryan Schaefer
var speed = 75;
// catch any window errors
window.onerror = function (error){
	alert(error);
};
// Logo to display whenever rebooting
var logo = `<pre>
SSSSSSSSSSSSS   QQQQQQQQQQQQQQQ   UUUU      UUUU   IIIIII   DDDDDDDDDDDDD
SSSSSSSSSSSSS   QQQQQQQQQQQQQQQ   UUUU      UUUU   IIIIII   DDDDDDDDDDDDDD
SSS             QQQQ       QQQQ   UUUU      UUUU   IIIIII   DDDD       DDDD
SSS             QQQQ       QQQQ   UUUU      UUUU            DDDD       DDDD
SSSSSSSSSSSSS   QQQQ       QQQQ   UUUU      UUUU   IIIIII   DDDD       DDDD
SSSSSSSSSSSSS   QQQQ QQQQ  QQQQ   UUUU      UUUU   IIIIII   DDDD       DDDD
          SSS   QQQQ  QQQQ QQQQ   UUUU      UUUU   IIIIII   DDDD       DDDD
          SSS   QQQQQQQQQQQQQQQ   UUUU      UUUU   IIIIII   DDDD       DDDD
SSSSSSSSSSSSS   QQQQQQQQQQQQQQQ   UUUUUUUUUUUUUU   IIIIII   DDDDDDDDDDDDDD
SSSSSSSSSSSSS             QQQQ    UUUUUUUUUUUUUU   IIIIII   DDDDDDDDDDDDD
                     SQUID                   DEV
</pre>`
// Shortened
function g_e(e){
	return document.getElementById(e);
};
// Generates a number of random non repeating loading strings 
function loading(number){
	var sayings = [
	"De-inking Squids ^06.^06.^06.|",
	"Adding Bones to Squids ^06.^06.^06.|",
	"Whoop Whoop Whoop ^06.^06.^06.|",
	"Reticulating Squids ^06.^06.^06.|",
	"Spawning Fatal Errors ^06.^06.^06.|",
	"Obtaining Inner Discord ^06.^06.^06.|",
	"De-loading the loader ^06.^06.^06.|",
	"Generating Witty Dialog ^06.^06.^06.|",
	"Darkening Ink ^06.^06.^06.|",
	"Fixing Grammer errers ^06.^06.^06.|",
	"To Fix Spell errors ^06.^06.^06.|",
	"Implying Easter Eggs ^06.^06.^06.|",
	"[Paul\'s contribution to the loading screen] ^06.^06.^06.|",
	"TWFraW5nIHBlb3BsZSBHb29nbGUgYmFzZTY0IHRvIHRleHQ= ^06.^06.^06.|",
	"Eadingray Igpay Atinlay ^06.^06.^06.|",
	"Loading loading message ^06.^06.^06.|",
	"Checking the html ^06.^06.^06.|",
	"Adding 4 and 4 ^06.^06.^06.|",
	"Surveying Users ^06.^06.^06.|"
	];
	var end = [];
	for (var i = 0; i < number; i++) {
		var x = sayings[Math.floor(Math.random() * sayings.length)]
		end += x
		sayings.splice(sayings.indexOf(x), 1);
	}
	return end;
}
// flag for animations
animation_done = true;
// The Game 
class Main{
	constructor(){
		this.animations = [];
		this.stage = null;
		// Don't you dare question this
		self = this;
	}
	// Pulls animation from this.animations and processes it.
	// Waits until previous animation is done playing
	// Blocks user input because we wouldn't want them messing 
	// All the beautiful animations up
	start_animating(){
		try{
			if (animation_done){
				g_e("input").onkeypress = function(event){return main.key_checker(event);};
				var y = this.animations.shift();
				y.func(y.args);
			}
			else{
				g_e("input").onkeypress = function(event){
					if(event.keyCode == 13){
					g_e("input").value = "";return false;}
					};
			}
		}
		catch(e){}
	}
	// Adds animation to queue
	add_animation(f, a){
		this.animations.push({func:f, args:a});
	}
	// Blinks the > in the input 
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
	// Clears console then adds logo
	// Console is then faded in and out and then made visible
	animation_start_up(object){
		animation_done = false;
		var fade = 0;
		var fadeOut = 0;
		var e = g_e("console");
		e.style.opacity = 0;
		e.innerHTML = logo;
		var interval = setInterval(function startFade(){
			e.style.opacity = fade;
			if(fade>1 && fadeOut == 0){
				fadeOut = 1;
			}
			else if(fade < 0){
				animation_done = true;
				fadeOut = 0;
				e.innerHTML = "";
				e.style.opacity = 1;
				clearInterval(interval);
			}
			else if(fadeOut == 0){
				fade = fade + 0.02;
			}
			else if(fadeOut == 1){
				fade = fade - 0.02;
			}
		}, 50);
	}
	// Prints a message to the console letter by letter
	// * is equivelent to NOP, a sleep of 75 miliseconds
	// ^ must be followed by two numbers and determines number of * to insert
	//  	Usage: ^06 (Note that the zero is needed)
	// | inserts a <br> 
	plbl(message){
		animation_done = false;
		var element = g_e("console");
		var i = 0;
		var interval = setInterval(function(){
			if (i<=message.length){
				if(message.charAt(i) == "|"){
					element.innerHTML += "<br>";
				}
				else if(message.charAt(i) == "^"){
					var n = message.charAt(i+1) + message.charAt(i+2);
					message = message.replace("^"+n, "*".repeat(n))
				}
				else if(message.charAt(i) == "%"){element.innerHTML += "&trade;"}
				else if(message.charAt(i) == "*"){}
				else{
				element.innerHTML += message.charAt(i);
				}
				i++;
			}
			else{
				animation_done = true;
				clearInterval(interval);
			}
		}, speed);
	}
	// Strings animations together making it look like the system is rebooting
	// Generally any animation that is after this should be wrapped in a set timeout of at least 25 - 50 ms so that the animations within this can be added before the animations after it
	// Get that?
	// Well idgaf it works.
	animation_reboot(object){
		self.add_animation(self.clear_console, {});
		self.add_animation(self.animation_start_up, {});
		self.add_animation(self.plbl, loading(5));
		self.add_animation(self.clear_console, {});
		self.add_animation(self.plbl, "SquidOS .^06.^06.^06 Booted!^13");
		self.add_animation(self.clear_console, {});
	}
	// I left this drawing for anyone who wishes to even begin to attempt to take a stab at how this works
	// Basically its a story tree
	// GL 
	// [LINK]
	command(input){
		if(input == "y"){
			if(!self.stage){
				self.add_animation(self.animation_reboot, {});
				setTimeout(function(){self.add_animation(self.plbl, "Welcome to SquidOS! An OS coded in-browser entirely in the greatest language on earth,^20 JavaScript. ^15| Why is JavaScript so amazing you might ask? |^15Well,^06 let me show you. ^20| #Ahem#^15 Javascript, ^13 What is 4 + 4? ||^13.^13.^13.|^13 >At least 7.|| ^30 Moving on, ^06 allow me to guide you along some of the features of SquidOS. ^09|");
				self.add_animation(self.clear_console, {});
				self.add_animation(self.plbl, "The screen before you where green text is appearing is the console. |^13 Its main purpose is to inform the user of what is happening via a series of green symbols.| ^13 Below the console is the SquidOS Text Response Field %.| ^13 You can, if you so desire, respond with text within the SquidOS Text Response Field %.^13 | To confirm that your SquidOS Text Response Field % is genuine ^06please respond the letter Y.");
			}, 10);
				self.stage = "boot";
			}
			else if(self.stage == "boot"){
				self.add_animation(self.clear_console);
				self.add_animation(self.plbl, "Thank you for responding to the SquidOS SquidOS Text Response Field % validation test %, please standby while further validation software is installed to validate your response.||^26Hello and welcome to the SquidOS Customer Retention Channel %. We know its hard waiting for 17 seconds and want you to know that you, [User Database Retrieval Error], are important to us. Thank you!||^13 Ah, here we are. ^06 We have confirmed that your SquidOS Text Response Field % is genuine.|^13 We would now like to preform a survey of user background. ^13 Would you like to participate in this user survey?");
				self.stage = "working";
			}
			else if(self.stage == "mistrust"){
				self.stage = "crash";
			}
			else if(self.stage == "working"){
				self.add_animation(self.clear_console);
				self.add_animation(self.plbl, "Marvalous. ^06 First question, Yes ^06 or No? | ^15 Y/N");
				self.stage = "survey";
			}
		}
		if(input == "n"){
			if(!self.stage){
				self.add_animation(self.clear_console);
				self.add_animation(self.plbl, "Are you sure you don't want to boot SquidOS? I have been authorized to offer anyone who rejects the first boot a free cake.");
				self.stage = "mistrust";
			}
			else if(self.stage == "boot"){
				self.stage = "fake"
			}
			else if(self.stage == "mistrust"){
				self.add_animation(self.clear_console);
				self.add_animation(self.plbl , "Well ok. ^23| I'm sorry I have to ask. Why didn't you just boot the first time? ^13| You know what don't answer that, I am sure you have your reasons. ^13| Anyway, moving on. ^13| I'm booting the OS now if everyone is completely utterly ok with that. ^16");
				self.add_animation(self.animation_reboot);
				self.stage = "mistrust2";
			}
			else if(self.stage == "working"){
				self.stage = "unkown";
			}
		}
	}
	// Clears and returns input
	// CSS determines that text will always be lower case
	// That means don't do something stupid like making an upcase command
	get_input(){
		var x = g_e("input").value;
		g_e("input").value = "";
		return x;
	}
	// this
	clear_console(object){
		g_e("console").innerHTML = "";
	}
	// Checks if key is enter then returns false so form isn't submitted
	key_checker(event){
		var key = event.keyCode;
		if (key == 13){
			this.command(this.get_input());
			return false;
		}
	}
	// this function effectively is what crashed that one Apollo Shuttle
	start(){
		setInterval(function(){self.start_animating();}, 1);
		this.animation_blink();
	}
}
main = new Main();
// We call that here
main.start();