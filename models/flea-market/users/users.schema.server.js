const mongoose = require('mongoose')
const usersSchema = mongoose.Schema({
  username: String,
  password: String,
  phone: String,
  email: String,
  role: String,
  address: String,
  dob: Date,
  following: [String]
}, {collection: 'users'})
module.exports = usersSchema
