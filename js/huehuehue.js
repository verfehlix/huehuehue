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