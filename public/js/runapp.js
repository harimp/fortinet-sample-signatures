/* eslint-disable no-console, no-unused-vars, no-param-reassign */
/* global $, angular, getData, getAJAX, document, updateTable, incMultiplier */
/* global setMultiplier, getStats, d3, d3PieData, d3PieGenerate */

const app = angular.module('dataTable', []);
app.controller('dataController', () => {
  angular.element($('#data-table-body')).scope().data = { pageMultiplier: 1 };
  updateTable();
});

let stats = null;

/* Init */
$(document).ready(() => {
  getStats((result) => {
    stats = result;
  });
  $('#search-btn').click(() => {
    setMultiplier(1);
    updateTable();
  });
  $('#see-more').click(() => {
    incMultiplier();
    updateTable();
  });
  $('#pageSelect').change(() => {
    setMultiplier(1); // reset to one page
    updateTable();
  });
});
