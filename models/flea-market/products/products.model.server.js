const mongoose = require("mongoose")
const productsSchema = require("./products.schema.server")
const productsModel = mongoose.model("ProductsModel", productsSchema)
module.exports = productsModel