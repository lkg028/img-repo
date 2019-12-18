const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/upload',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

// 执行所有schema模块的代码
require('../models/File')