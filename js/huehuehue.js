var gui = require('nw.gui');
var win = gui.Window.get();

var tray = new gui.Tray({
	title: 'huehuehue',
	icon: "/img/tray.png",
	alticon: '',
	tooltip: window.document.title,
	iconsAreTemplates: false
});

tray.on('click', toggleTrayMenuAt.bind(this));

win.on('blur', function() {
	win.hide();
	win.shown = false;
}.bind(this));

// called when user click on tray icon
function toggleTrayMenuAt(position) {
	if (win.shown) {
		win.hide();
		win.shown = false;
	} else {
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

var huecontrol = require("./js/huecontrol");

var checkbox1 = document.getElementById("lightswitch1");
checkbox1.addEventListener("change", function(){
    if (checkbox1.checked) {
        huecontrol.turnOnLight(1);
    } else {
        huecontrol.turnOffLight(1);
    }
});

var checkbox2 = document.getElementById("lightswitch2");
checkbox2.addEventListener("change", function(){
    if (checkbox2.checked) {
        huecontrol.turnOnLight(2);
    } else {
        huecontrol.turnOffLight(2);
    }
});


var checkbox3 = document.getElementById("lightswitch3");
checkbox3.addEventListener("change", function(){
    if (checkbox3.checked) {
        huecontrol.turnOnLight(3);
    } else {
        huecontrol.turnOffLight(3);
    }
});


