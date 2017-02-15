const fortinetData = require('./test.json');

const formattedData = [];

const formatSignatures = function formatSignatures() {
  fortinetData.forEach((item) => {
    const signature = {};
    signature.name = item[0];
    signature.category = item[1];
    signature.technology = item[2];
    signature.popularity = item[3];
    signature.risk = item[4];
    signature.release = item[5];
    signature.vendor = item[6];
    signature.vendorURL = item[7];
    signature.impact = item[8];
    signature.summary = item[9];
    signature.shortSummary = item[11];
    signature.recommendedAction = item[12];
    signature.references = item[13];
    signature.id = item[14];

    formattedData.push(signature);
  });

  return formattedData;
};

const filterByName = function filterByName(query) {
  return formattedData.filter(item => item.name.search(query) >= 0);
};

const getData = function getData(offset, pagesize, search) {
  const returnOffset = offset || 0;
  const returnSize = Number(pagesize) || 10;

  let searchResultData = null;
  if (!search) {
    searchResultData = formattedData;
  } else if (search.type === 'name') {
    searchResultData = filterByName(search.query);
  } else {
    searchResultData = formattedData;
  }

  return searchResultData.slice(returnOffset, returnOffset + returnSize);
  // return searchResultData;
};

const getStats = function getStats() {

};

module.exports = {
  formatSignatures,
  formattedData,
  getData,
  getStats,
};
