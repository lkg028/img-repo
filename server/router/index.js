const Router = require('koa-router')
const base64 = require('base64-node')
const NodeRSA = require('node-rsa')
const md5 = require('md5')
const router = new Router()



// 获取上传签名
router.get('/token',/* require('./auth')() ,*/ async (ctx) => {
  ctx.status = 200
  ctx.body = require('./uploadConf')()
})


// 接收oss回调，存储到mongodb
router.post('/add', async ctx => {
  let result = false
  let public_key = ''
  const signature = ctx.get('authorization')
  const key = new NodeRSA()
  // 验证oss回调的Authorization
  // 1. 获得公钥
  const public_key_url = base64.decode(ctx.get('x-oss-pub-key-url'))
  if (public_key_url.indexOf('alicdn.com') >= 0) {
    let res = await axios.get(public_key_url)
    public_key = res.data
  }

  // 2. 获得原始字符串
  const src_str = ctx.path + ctx.querystring + '\n' +  JSON.stringify(ctx.request.body)

  result = key.verify(public_key, signature, md5(src_str),'base64')
  if (result) {
    ctx.status = 200
    ctx.body = {"a":"b"}
  } else {
    ctx.status = 401
    ctx.body = { msg: '认证失败' }
  }
})

const axios = require('axios')
router.post('/test', async ctx => {
  let body_str = ''
  for (let k in Object.keys(ctx.request.body)) {
    body_str += `${k}=${ctx.request.body[k]}`
  }
  ctx.body = body_str

})


module.exports = router