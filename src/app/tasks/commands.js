const get = require('lodash/get');

const commands = {
  'get-all-containers': 'docker ps -a --no-trunc --format "{{.ID}}<br>{{.Names}}<br>{{.Command}}<br>{{.Ports}}<br>{{.Status}}"',
  'get-running-containers': 'docker ps --format "{{.ID}}<br>{{.Names}}<br>{{.Command}}<br>{{.Ports}}<br>{{.Status}}"',
};

exports.get = commandKey => get(commands, commandKey);
