"use strict";

var gui = global.window.nwDispatcher.requireNwGui();
var util = require('util');

class CustomTrayMenu {
    constructor(windowPath, trayIcon, windowOptions) {
        this.shown = false;
        this.iconWidth = 20;

        this.trayIcon = trayIcon || '/img/tray.png';
        this.menuWindowPath = windowPath || 'custom-tray-menu.html';
        this.menuWndowOptions = windowOptions || {
            width: 185,
            height: 143
        };

        this._initTray();
        this._initMenuWindow();

        this.tray.on('click', this.toggleTrayMenuAt.bind(this));
    }

    // remove tray, cose custom menu window
    remove() {
        this.tray.remove();
        this.tray = null;
        this.trayMenu.close();
    }

    _initTray() {
        this.tray = new gui.Tray({
            title: '',
            icon: this.trayIcon,
            alticon: '',
            tooltip: window.document.title,
            iconsAreTemplates: false
        });
    }

    _initMenuWindow() {
        var windowOptions = util._extend({
            width: 200,
            height: 100,
            frame: false,
            transparent: true,
            resizable: false,
            toolbar: false,
            show: false,
            show_in_taskbar: false
        }, this.menuWndowOptions);

        this.trayMenu = gui.Window.open(this.menuWindowPath, windowOptions);

        // add class to new window's body to apply platform specific css
        this.trayMenu.on('document-end', function() {
            this.trayMenu.window.document.body.className += ' ' + process.platform;
        }.bind(this));

        this.trayMenu.on('blur', function() {
            this.trayMenu.hide();
            this.shown = false;
        }.bind(this));
    }

    // called when user click on tray icon
    toggleTrayMenuAt(position) {
        if (this.shown) {
            this.trayMenu.hide(); // this will trigger listener added above
        } else {
            this.translate(position);
            this.trayMenu.moveTo(position.x, 30);
            this.trayMenu.show();
            this.trayMenu.focus();
            this.shown = true;
        }
    }

    // calculdate position for window to appear
    translate(pos) {
        pos.x -= Math.floor(this.trayMenu.width / 2);
        pos.y -= this._trayAreaIsTop(pos) ? 0 : this.trayMenu.height + this.iconWidth / 2 - 5;
    }

    _trayAreaIsTop(pos) {
        var screen;
        if (gui.Screen.Init) gui.Screen.Init();

        function posInBounds(s) {
            return pos.y > s.bounds.y && pos.y < (s.bounds.y + s.bounds.height) &&
                pos.x > s.bounds.x && pos.x < (s.bounds.x + s.bounds.width);
        }
        screen = gui.Screen.screens.filter(posInBounds)[0];
        return pos.y < (screen.bounds.y + screen.bounds.height) / 2;
    }
}

module.exports = CustomTrayMenu;