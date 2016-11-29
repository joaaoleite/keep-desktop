'use strict';
const join = require('path').join;
const BrowserWindow = require('electron').BrowserWindow;
const config = require('./config');
var willQuitApp = false

module.exports = function createMainWindow(app, handleResize, handleClosed) {
  const lastWindowState = config.get('lastWindowState');

  const window = new BrowserWindow({
    minWidth: 615,
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: lastWindowState.width,
    height: lastWindowState.height,
    icon: join(__dirname, '../assets/icon.png'),
    title: 'Keep',
    titleBarStyle: 'hidden-inset',
    webPreferences: {
      preload: `${__dirname}/browser.js`
    }
  });

  window.loadURL('https://keep.google.com');
  window.on('resize', handleResize);
  window.on('closed', handleClosed);

  app.on('before-quit', () => willQuitApp = true);
  window.on('close', (e) => {
    if (willQuitApp) {
      /* the user tried to quit the app */
      //window = null;
    } else {
      /* the user only tried to close the window */
      e.preventDefault();
      window.hide();
    }
  });

  return window;
};
