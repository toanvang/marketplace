const productModel = require("../../models/flea-market/products/products.model.server")

const createProduct = (newProduct) => productModel.create(newProduct)
const findAllProducts = () => productModel.find()
const searchProducts = (searchConditions) => productModel.find(searchConditions)

module.exports = {createProduct, findAllProducts}