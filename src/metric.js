/**
 * Create usage metric for Prometheus
 *
 * @param  {Object} usage Usage data
 * @return {String}       Metric data in Prometheus notation
 */
exports.createUsageMetric = (usage) => {
  const {
    mac, ip, inBytes, outBytes, totalBytes,
  } = usage;

  const data = [
    `luci_wrtbwmon_usage_in{mac="${mac}", ip="${ip}"} ${inBytes}`,
    `luci_wrtbwmon_usage_out{mac="${mac}", ip="${ip}"} ${outBytes}`,
    `luci_wrtbwmon_usage_total{mac="${mac}", ip="${ip}"} ${totalBytes}`,
  ];

  return data.join('\n');
};
