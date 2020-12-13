const productModel = require("../../models/flea-market/products/products.model.server")

const createProduct = (newProduct) => productModel.create(newProduct)

const findAllProducts = () =>
  productModel.find().populate('owner', 'username _id')

const findProductById = (pid) =>
  productModel.findById(pid)

const searchProducts = (searchConditions) =>
  productModel.find(searchConditions).populate('owner', 'username _id')

const updateProduct = (pid, product) => productModel.findByIdAndUpdate(pid, product)
const deleteProduct = (pid) => productModel.deleteOne({_id: pid})

module.exports = {createProduct, findAllProducts, findProductById, searchProducts, updateProduct, deleteProduct}