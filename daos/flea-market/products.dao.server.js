const productModel = require("../../models/flea-market/products/products.model.server")

const createProduct = (newProduct) => productModel.create(newProduct)
const findAllProducts = () => productModel.find()
const searchProducts = (searchConditions) => productModel.find(searchConditions)
const updateProduct = (pid, product) => productModel.findByIdAndUpdate({pid}, product)
const deleteProduct = (pid) => productModel.deleteOne({_id: pid})

module.exports = {createProduct, findAllProducts, searchProducts, updateProduct, deleteProduct}