const logger = require('./src/logger');
const server = require('./src/server');
const { putUsageData } = require('./src/usage-cache');
const { connect, getUsageCsv } = require('./src/ssh');
const { parseUsageCsv } = require('./src/usage');

logger.init();

const GET_USAGE_INTERVAL_MS = 30000;
const { SSH_HOST, SSH_USERNAME, SSH_IDENTITY } = process.env;

async function main() {
  const sshClient = await connect(SSH_HOST, SSH_USERNAME, SSH_IDENTITY);

  const retrieveUsageData = async () => {
    const usageCsv = await getUsageCsv(sshClient);

    const usage = await parseUsageCsv(usageCsv);

    putUsageData(usage);
  };

  retrieveUsageData();

  setInterval(retrieveUsageData, GET_USAGE_INTERVAL_MS);

  server.listen(process.env.PORT || 3000);
}

main();
