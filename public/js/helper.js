/* eslint-disable no-unused-vars */
/* global $ */

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
