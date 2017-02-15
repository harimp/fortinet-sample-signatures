/* eslint-disable no-console, no-unused-vars, no-param-reassign */
/* global $, angular, getData, getAJAX, document */

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

const app = angular.module('dataTable', []);
app.controller('dataController', () => {
  angular.element($('#data-table-body')).scope().data = { pageMultiplier: 1 };
  updateTable();
});

/* Init */
$(document).ready(() => {
  $('#search-btn').click(updateTable);
  $('#see-more').click(() => {
    incMultiplier();
    updateTable();
  });
  $('#pageSelect').change(() => {
    setMultiplier(1); // reset to one page
    updateTable();
  });
});
