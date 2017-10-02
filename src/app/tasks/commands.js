const _ = require('lodash');

const commands = {
  'get-all-containers': 'docker ps -a --no-trunc --format "{{.ID}}<br>{{.Names}}<br>{{.Command}}<br>{{.Ports}}<br>{{.Status}}"',
  'get-running-containers': 'docker ps --format "{{.ID}}<br>{{.Names}}<br>{{.Command}}<br>{{.Ports}}<br>{{.Status}}"',
};

exports.get = commandKey => _.get(commands, commandKey);
