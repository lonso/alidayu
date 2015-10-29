/**
 *  lonso on 15-10-28_neptune.
 *  lonso@foxmail.com
 */
var should = require('should');
var AliDaYu = require('../');
var aliDaYu = new AliDaYu({app_key: xxx, secret: 'xxx'});
describe('alidayu', function () {
  it('sms should pass', function *() {
    var res = yield aliDaYu.sms(
      {
        sms_free_sign_name: '活动验证',
        sms_param: {"product": "活动", "code": "验证码", "item": "主题"},
        rec_num: 'xxxx',
        sms_template_code: 'SMS_1585164'
      }
    );
    res = JSON.parse(res);
    res.alibaba_aliqin_fc_sms_num_send_response.result.success.should.equal(true);
  });
});