/**
 *  lonso on 15-10-28_neptune.
 *  lonso@foxmail.com
 */
'use strict';
var request = require('request');
var thunkify = require('thunkify-wrap');
module.exports = thunkify(function (error, callback) {
  request.get({
    headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
    url: this.gw + '?' + arguments[0]
  }, function (error, response, body) {
    if (error) callback(error);
    else
      callback(null, body);
  });
});
