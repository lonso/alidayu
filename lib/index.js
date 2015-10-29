/**
 *  lonso on 15-10-28_neptune.
 *  lonso@foxmail.com
 */
"use strict";
var moment = require('moment');
var crypto = require('crypto');
var Buffer = require('buffer');
var urlencode = require('urlencode');
var helper = require('../utils');

function AliDaYu(options) {
  options = options || {};
  this.gw = 'http://gw.api.taobao.com/router/rest';
  this.v = '2.0';
  this.format = 'json';
  this.sign_method = 'md5';
  for (var key in options)
    this[key] = options[key]
  return this;
}

AliDaYu.prototype.md5 = function *(str) {
  if (!str) return;
  var bufferSize = str.length > 1024 ? str.length : 1024;
  var Buffer = require('buffer').Buffer;
  var buf = new Buffer(bufferSize);
  var len = buf.write(str, 0, bufferSize);
  str = buf.toString('binary', 0, len);
  return crypto.createHash('md5').update(str).digest('hex');
};

AliDaYu.prototype.common = function (args) {
  args = args || {};
  args.app_key = this.app_key;
  args.v = this.v;
  args.sign_method = this.sign_method;
  args.format = this.format;
  args.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  return args
};

AliDaYu.prototype.sign = function *(args) {
  args = this.common(args);
  var _signString = [];
  for (var key in args) {
    if (typeof  args[key] == 'object')
      _signString.push(key + JSON.stringify(args[key]));
    else
      _signString.push(key + args[key]);

  }
  _signString.sort();
  return (yield this.md5(this.secret + _signString.join('') + this.secret)).toUpperCase();
};

AliDaYu.prototype.request = function *(args) {
  var keys = Object.keys(args);
  var _reqStr = [];
  for (var i = 0; i < keys.length; i++) {
    if ((typeof args[keys[i]]) === 'object') {
      _reqStr.push(keys[i] + '=' + urlencode(JSON.stringify(args[keys[i]])));
    } else {
      _reqStr.push(keys[i] + '=' + urlencode(args[keys[i]]));
    }
  }
  return yield helper.call(this, _reqStr.join('&'));
};


AliDaYu.prototype.sms = function *(args) {
  args = args || {};
  args.method = 'alibaba.aliqin.fc.sms.num.send';
  args.sms_type = 'normal';
  args.sign = yield this.sign(args);
  return yield this.request(args);
};


module.exports = AliDaYu;
