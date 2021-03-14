const mongoose = require('mongoose')
const productsSchema = mongoose.Schema({
  name: String,
  type: String,
  price: {type: Number, min: 1},
  description: String,
  address: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel'},
  images: [{ data: Buffer, contentType: String }],
  location: {type: Map, of: Number},
  status: {type: String}

}, {collection: 'products'})
module.exports = productsSchema
