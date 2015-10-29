# alidayu
alidayu for node with es6

```javascript  
    var AliDaYu = require('../');
    var aliDaYu = new AliDaYu({app_key: xxx, secret: 'xxx'});
    yield aliDaYu.sms(
      {
        sms_free_sign_name: '活动验证',
        sms_param: {"product": "xiaoming", "code": "1234", "item": "123"},
        rec_num: 'xxxx',
        sms_template_code: 'SMS_1585164'
      }
    );
```


