const process = require('child_process').exec;

const callback = (event, commandKey, outputObj) => {
  if (outputObj.error) {
    event.sender.send(`error-${commandKey}`, {
      log: outputObj.errorLog,
    });
  } else {
    event.sender.send(`success-${commandKey}`, {
      log: outputObj.output,
    });
  }
};

module.exports = (command, event, commandKey) => {
  process(command, (error, stdout, stderr) => {
    const outputObj = {
      error,
      output: stdout,
      errorLog: stderr,
    };
    callback(event, commandKey, outputObj);
  });
};
