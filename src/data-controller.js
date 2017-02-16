const fortinetData = require('./test.json');

const formattedData = [];
const stats = {};

const formatSignatures = function formatSignatures() {
  fortinetData.forEach((item) => {
    const signature = {};
    signature.name = String(item[0]);
    signature.category = String(item[1]);
    signature.technology = item[2];
    signature.popularity = item[3];
    signature.risk = item[4];
    signature.release = String(item[5]);
    signature.vendor = String(item[6]);
    signature.vendorURL = String(item[7]);
    signature.impact = String(item[8]);
    signature.summary = String(item[9]);
    signature.shortSummary = String(item[11]);
    signature.recommendedAction = String(item[12]);
    signature.references = String(item[13]);
    signature.id = item[14];

    formattedData.push(signature);
  });

  return formattedData;
};

const filterByName = function filterByName(query) {
  return formattedData.filter(item => (item.name.toLowerCase().search(query) >= 0)
    || (item.vendor.toLowerCase().search(query) >= 0));
};

const getData = function getData(offset, pagesize, search) {
  const returnOffset = offset || 0;
  const returnSize = Number(pagesize) || 10;

  let searchResultData = null;
  if (!search) {
    searchResultData = formattedData;
  } else if (search.query) {
    searchResultData = filterByName(search.query);
  } else {
    searchResultData = formattedData;
  }

  return searchResultData.slice(returnOffset, returnOffset + returnSize);
  // return searchResultData;
};

const getVendorStat = function getVendorStat() {
  const result = {};
  formattedData.forEach((item) => {
    if (result[item.vendor]) {
      result[item.vendor] += 1;
    } else {
      result[item.vendor] = 1;
    }
  });

  return result;
};

const getCategoryStat = function getCategoryStat() {
  const result = {};
  formattedData.forEach((item) => {
    if (result[item.category]) {
      result[item.category] += 1;
    } else {
      result[item.category] = 1;
    }
  });

  return result;
};

const getTechnologyStat = function getTechnologyStat() {
  const result = {};
  formattedData.forEach((item) => {
    if (result[item.technology]) {
      result[item.technology] += 1;
    } else {
      result[item.technology] = 1;
    }
  });

  return result;
};

const getRiskStat = function getRiskStat() {
  const result = {};
  formattedData.forEach((item) => {
    if (result[item.risk]) {
      result[item.risk] += 1;
    } else {
      result[item.risk] = 1;
    }
  });

  return result;
};

const getTotalItems = function getTotalItems() {
  return formattedData.length;
};

const gatherStatInfo = function gatherStatInfo() {
  stats.vendor = getVendorStat();
  stats.category = getCategoryStat();
  stats.tech = getTechnologyStat();
  stats.risk = getRiskStat();
  stats.total = getTotalItems();
};

const getStats = function getStats() {
  return stats;
};

const getInfoByID = function getInfoByID(id) {
  return formattedData.filter(item => id === item.id);
};

module.exports = {
  formatSignatures,
  formattedData,
  getData,
  gatherStatInfo,
  getStats,
  getInfoByID,
};
