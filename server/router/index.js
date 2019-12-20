const Router = require('koa-router')
const router = new Router()



// 获取上传签名
router.get('/token', require('./auth')() , async (ctx) => {
  ctx.status = 200
  ctx.body = require('./uploadConf')()
})


// 接收oss回调，简单响应，不做rsa验证
router.post('/oss-cb', async ctx => {
    ctx.status = 200
    ctx.body = ctx.request.body
})



module.exports = router