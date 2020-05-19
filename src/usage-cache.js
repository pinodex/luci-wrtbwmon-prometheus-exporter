const usageData = [];

/**
 * Store usage data
 * @param  {Array} data  List of usage data
 */
exports.putUsageData = (data) => {
  usageData.length = 0;

  usageData.push(...data);
};

/**
 * Get stored usage data
 *
 * @return {Array} List of usage data
 */
exports.getUsageData = () => usageData;
