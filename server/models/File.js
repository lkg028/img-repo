const mongoose = require('mongoose')
const schema = mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  user: String,
  type: String,
  width: Number,
  height: Number,
}, { timestamps: true })

module.exports = mongoose.model('File', schema)