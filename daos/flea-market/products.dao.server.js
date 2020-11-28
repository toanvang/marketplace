const productModel = require("../../models/flea-market/products/products.model.server")

const createProduct = (newProduct) => productModel.create(newProduct)

module.exports = {createProduct}