var gui = require('nw.gui');
var win = gui.Window.get();
var huecontrol = require("./js/huecontrol");

//get ui controls
var checkbox1 = document.getElementById("switch-1");
var checkbox2 = document.getElementById("switch-2");
var checkbox3 = document.getElementById("switch-3");
var brightnessSlider = document.getElementById("brightnessSlider");
var sceneButton1 = document.getElementById("btn_scene1");
var sceneButton2 = document.getElementById("btn_scene2");
var sceneButton3 = document.getElementById("btn_scene3");

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

sceneButton1.addEventListener("click", function(evt){
	var sceneId = evt.srcElement.parentElement.getAttribute("sceneid");
	huecontrol.activateScene(sceneId, function(result){
		updateInterface();
	});
});
sceneButton2.addEventListener("click", function(evt){
	var sceneId = evt.srcElement.parentElement.getAttribute("sceneid");
	huecontrol.activateScene(sceneId, function(result){
		updateInterface();
	});

});
sceneButton3.addEventListener("click", function(evt){
	var sceneId = evt.srcElement.parentElement.getAttribute("sceneid");
	huecontrol.activateScene(sceneId, function(result){
		updateInterface();
	});
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
		if(data.state.on) {
			checkbox1.parentElement.MaterialSwitch.on();
		} else {
			checkbox1.parentElement.MaterialSwitch.off();
		}
		var brightnessPercent = (data.state.bri / 255) * 100;
		brightnessSlider.MaterialSlider.change(brightnessPercent)
	});

	huecontrol.getLightStatus(2, function(data){
		if(data.state.on) {
			checkbox2.parentElement.MaterialSwitch.on();
		} else {
			checkbox2.parentElement.MaterialSwitch.off();
		}
	});

	huecontrol.getLightStatus(3, function(data){
		if(data.state.on) {
			checkbox3.parentElement.MaterialSwitch.on();
		} else {
			checkbox3.parentElement.MaterialSwitch.off();
		}
	});
}

updateInterface();
