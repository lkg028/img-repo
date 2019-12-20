const crypto = require('crypto')
const base64 = require('base64-node')
const accessKey_ID = 'LTAI4FtWPVqFFcGnWPY6hzgT'
const access_Key_Secret = 'qfF96t9fKT14R5GxiTekNvtmJ8qaT9'
const host = 'https://lkg028.oss-cn-shanghai.aliyuncs.com'

module.exports = () => {
  const now = + new Date()
  let policy = {
    expiration: (new Date(now + 300000)).toISOString(),
    conditions: [ {"bucket": "lkg028"} ]
  }
  policy = base64.encode(JSON.stringify(policy))
  return  {
    accessid: accessKey_ID,
    host: host,
    policy: policy,
    signature: crypto.createHmac('sha1', access_Key_Secret).update(policy).digest('base64'),
    expire: now + 300000,
    // oss回调
    callback: base64.encode(JSON.stringify({
      callbackUrl: 'https://image.lkg028.cn/oss-cb',
      callbackBody: 'id=${object}&type=${mimeType}&size=${size}&width=${imageInfo.width}&height=${imageInfo.height}',
      callbackBodyType: "application/json"
    })),
    dir: '/'
  }
}

