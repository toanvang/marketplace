const productsDao = require("../../daos/flea-market/products.dao.server")

const createProduct = (req, res) => {
  const newProduct = req.body;
  console.log("createProduct: " + JSON.stringify(newProduct))
  productsDao.createProduct(newProduct)
    .then(actualProduct => res.json(actualProduct))
}

const findAllProducts = (req, res) =>
  productsDao.findAllProducts().then(products => {
    console.log("findAllProducts: " + JSON.stringify(products))
    res.json(products)
  })

const searchProducts = (req, res) => {
  const searchConditions = req.body
  console.log("searchProducts" + JSON.stringify(searchConditions))
  productsDao.searchProducts(searchConditions).then(products => res.json(products))
}

module.exports = (app) => {
  app.post('/api/products', createProduct)
  app.get('/api/products', findAllProducts)
  app.post('/api/products/search', searchProducts)
}