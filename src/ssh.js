const SSH2Promise = require('ssh2-promise');
const logger = require('./logger');

/**
 * Connect to SSH server
 *
 * @param  {String} host     OpenWrt Router Host/IP
 * @param  {String} username OpenWrt Router SSH Username
 * @param  {String} identity OpenWrt Router SSH Identity File Path
 * @return {SSH2Promise}
 */
exports.connect = async function connect(host, username, identity) {
  const ssh = new SSH2Promise({ host, username, identity });

  logger.info(`Connecting to ${username}@${host}...`);

  try {
    await ssh.connect();
  } catch (e) {
    logger.error(`Cannot connect to ${username}@${host}`);

    throw e;
  }

  logger.info(`Connected to ${username}@${host}!`);

  return ssh;
};

/**
 * Get usage CSV data
 *
 * @param  {SSH2Promise} sshClient SSH2Promise instance
 * @return {String}
 */
exports.getUsageCsv = async function getUsageCsv(sshClient) {
  return sshClient.exec('cat /etc/config/usage.db');
};
