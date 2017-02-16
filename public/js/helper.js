/* eslint-disable no-unused-vars */
/* global $, angular, d3 */

const getAJAX = function getAJAX(target, callback) {
  $.ajax({
    url: target,
    complete: (xhr, status) => {
      callback(JSON.parse(xhr.responseText));
    },
  });
};

const getData = function getData(offset, pagesize, search, callback) {
  let targetURL = '/data?';
  if (offset) {
    targetURL += `offset=${offset}&`;
  }
  if (pagesize) {
    targetURL += `pagesize=${pagesize}&`;
  }
  if (search) {
    targetURL += `searchType=${search.type}&searchQuery=${search.query}`;
  }

  const targetCallback = callback || (result => result);
  return getAJAX(targetURL, targetCallback);
};

const getStats = function getStats(callback) {
  const targetURL = '/stats';
  const targetCallback = callback || (result => result);
  return getAJAX(targetURL, targetCallback);
};

const getMultiplier = function getMultiplier() {
  return angular.element($('#data-table-body')).scope().data.pageMultiplier;
};

const setMultiplier = function setMultiplier(x) {
  angular.element($('#data-table-body')).scope().data.pageMultiplier = x;
};

const incMultiplier = function incMultiplier() {
  setMultiplier(getMultiplier() + 1);
};

const updateTable = function updateTable() {
  const type = 'name';
  const query = $('#search-bar').val();
  const pageSize = $('#pageSelect').val();
  const targetPageSize = (isNaN(pageSize)) ? Infinity : Number(pageSize);
  const multiplier = getMultiplier();

  getData(null, multiplier * targetPageSize, { type, query }, (result) => {
    const scope = angular.element($('#data-table-body')).scope();
    scope.$apply(() => {
      scope.data.data = result;
    });
  });
};
