const http = require('http');
const { createUsageMetric } = require('./metric');
const { getUsageData } = require('./usage-cache');

const requestHandler = async (req, res) => {
  if (req.url !== '/metrics') {
    res.statusCode = 404;
    res.end('Not Found');

    return;
  }

  getUsageData().forEach((usage) => {
    res.write(`${createUsageMetric(usage)}\n`);
  });

  res.end();
};

module.exports = http.createServer(requestHandler);
