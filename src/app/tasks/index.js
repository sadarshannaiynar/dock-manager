const containerTasks = require('./containerTasks');

exports.bind = (electron) => {
  const ipcMain = electron.ipcMain;

  containerTasks.bind(ipcMain);
};
