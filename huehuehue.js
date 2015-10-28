// Load native UI library
var gui = require('nw.gui');

// Create a tray icon
var tray = new gui.Tray({
	title: 'huehuehue',
	icon: 'icon.png'
});

// Give it a menu
var menu = new gui.Menu();
menu.append(new gui.MenuItem({
	type: 'checkbox',
	label: 'box1'
}));
tray.menu = menu;

// Get the current window
var win = gui.Window.get();

// Listen to the minimize event
win.on('minimize', function() {
  console.log('Window is minimized');
});

