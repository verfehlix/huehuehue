var gui = require('nw.gui');
var win = gui.Window.get();
var huecontrol = require("./js/huecontrol");

//get ui controls
var checkbox1 = document.getElementById("switch-1");
var checkbox2 = document.getElementById("switch-2");
var checkbox3 = document.getElementById("switch-3");
var brightnessSlider = document.getElementById("brightnessSlider");

//empty list for scenes
var scenes = [];

//create tray icon
var tray = new gui.Tray({
	title: 'huehuehue',
	icon: "/img/tray.png",
	alticon: '',
	tooltip: window.document.title,
	iconsAreTemplates: false
});

//add event listeners
tray.on('click', toggleTrayMenuAt.bind(this));

win.on('blur', function() {
	win.hide();
	win.shown = false;
}.bind(this));

checkbox1.addEventListener("change", function(){
    if (checkbox1.checked) {
        huecontrol.turnOnLight(1);
    } else {
        huecontrol.turnOffLight(1);
    }
});

checkbox2.addEventListener("change", function(){
    if (checkbox2.checked) {
        huecontrol.turnOnLight(2);
    } else {
        huecontrol.turnOffLight(2);
    }
});

checkbox3.addEventListener("change", function(){
    if (checkbox3.checked) {
        huecontrol.turnOnLight(3);
    } else {
        huecontrol.turnOffLight(3);
    }
});

brightnessSlider.addEventListener("change", function(){
	huecontrol.setBrightness(brightnessSlider.value);
});



// called when user click on tray icon
function toggleTrayMenuAt(position) {
	if (win.shown) {
		win.hide();
		win.shown = false;
	} else {
		updateInterface();
		translate(position);
		win.moveTo(position.x, 30);
		win.show();
		win.focus();
		win.shown = true;
	}
}

function translate(pos) {
	pos.x -= Math.floor(win.width / 2);
	pos.y -= 0;
}

function updateInterface() {
	huecontrol.getLightStatus(1, function(data){
		checkbox1.checked = data.state.on;
		var brightnessPercent = (data.state.bri / 255) * 100;
		brightnessSlider.MaterialSlider.change(brightnessPercent)
	});

	huecontrol.getLightStatus(2, function(data){
		checkbox2.checked = data.state.on;
	});

	huecontrol.getLightStatus(3, function(data){
		checkbox3.checked = data.state.on;
	});

	huecontrol.getScenes(function(data){
		scenes = data;
	});
}

document.addEventListener('DOMContentLoaded', function() {
    updateInterface();
}, false);
