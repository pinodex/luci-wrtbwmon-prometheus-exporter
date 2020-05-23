const neatCsv = require('neat-csv');

/**
 * Format date time extracted from luci-wrtbwmon
 *
 * @param  {String} string Datetime string
 * @return {String}
 */
function formatDateTime(string) {
  const [date, time] = string.split('_');
  const [day, month, year] = date.split('-');
  const [hour, minute, second] = time.split(':');

  return `${month}-${day}-${year} ${hour}:${minute}:${second}`;
}

/**
 * Parse usage CSV to object
 *
 * @param  {String} data CSV Data
 * @return {Object}
 */
exports.parseUsageCsv = async (data) => {
  const headers = [
    'mac',
    'ip',
    'iface',
    'inBytes',
    'outBytes',
    'totalBytes',
    'firstDate',
    'lastDate',
  ];

  const mapValues = ({ header, value }) => {
    switch (header) {
      case 'in':
      case 'out':
      case 'total':
        return Number(value);

      case 'firstDate':
      case 'lastDate':
        return new Date(formatDateTime(value));

      default:
        return value;
    }
  };

  const skipLines = 1;

  return neatCsv(data, { headers, mapValues, skipLines });
};
