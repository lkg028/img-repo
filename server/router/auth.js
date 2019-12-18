const axios = require('axios')
const SSO_USER_URL = 'https://auth.lkg028.cn/user'
const SSO_URL = 'https://auth.lkg028.cn/'
module.exports = function(opts) {
  return async (ctx, next) => {
    // 获取token
    let token = ctx.cookies.get('jwt')
    let res = null
    // 尝试验证
    try {
      res = await axios.post(SSO_USER_URL, { jwt: token })
    } catch (err) {
      console.log('认证服务器认证失败，位置auth.js')
      return ctx.redirect( SSO_URL )
    }
    // 验证成功
    ctx.state.userInfo = res.data
    await next()
  }
}