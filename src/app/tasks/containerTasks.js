const exec = require('../helpers/exec');
const commands = require('./commands');

exports.bind = (ipcMain) => {
  ipcMain.on('get-all-containers', (event) => {
    const commandKey = 'get-all-containers';
    exec(commands.get(commandKey), event, commandKey);
  });
};
