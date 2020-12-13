const mongoose = require('mongoose')
const remarksSchema = mongoose.Schema({
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductsModel'},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel'},
  postTime: { type: Date, default: Date.now },
  content: String
}, {collection: 'remarks'})
module.exports = remarksSchema