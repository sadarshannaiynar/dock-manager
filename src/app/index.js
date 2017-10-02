const electron = require('electron');
const path = require('path');

const fixPath = require('fix-path');

if (process.platform === 'darwin') fixPath();

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const tasks = require('./tasks');

tasks.bind(electron);

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
    },
  });

  if (process.env.NODE_ENV === 'dev') {
    mainWindow.loadURL('http://localhost:8100/');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(`file://${path.resolve(__dirname, 'index.html')}`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
