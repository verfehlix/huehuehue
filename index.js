"use strict";

var gui = require('nw.gui');
var CustomTrayMenu = require('./custom_tray_menu');

var $ = function (selector) {
  return document.querySelector(selector);
}

var customTray;

document.addEventListener('DOMContentLoaded', function() {
  $('#add-tray').addEventListener('click', function () {
    if (!customTray) {
      customTray = new CustomTrayMenu('custom-tray-menu.html', 'tray.png', {
        width: 185,
        height: 143
      });
    }
  });

  $('#remove-tray').addEventListener('click', function () {
    if (customTray) {
      customTray.remove();
      customTray = undefined;
    }
  });

  // bring window to front when open via terminal
  gui.Window.get().focus();

  // for nw-notify frameless windows
  gui.Window.get().on('close', function() {
    gui.App.quit();
  });
});
