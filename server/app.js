const Koa = require('koa')
const cors = require('@koa/cors')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')   // 好像用不上
const path = require('path')
const app = new Koa()

// 跨域
app.use(cors({
  origin: 'lkg028.cn',
  credentials: true,
	maxAge: 36000
}))

// 存储请求体
app.use(koaBody())

// 静态资源
app.use(koaStatic(path.join(__dirname, './public'), {index: 'index.html'}))

// 连接数据库
require('./plugins/db.js')

// 导入路由
app.use(require('./router').routes())
app.use(require('./router').allowedMethods())


// 添加错误处理
app.on('error', async (err, ctx) => {
  console.log(err)
})
// 启动应用
app.listen(3001, () => {
  console.log('应用启动成功，端口：3001')
})







