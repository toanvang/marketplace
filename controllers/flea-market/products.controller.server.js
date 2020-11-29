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

const updateProduct = (req, res) => {
  const pid = req.params.pid
  const product = req.body;
  productsDao.updateProduct(pid, product).then(status => res.sendStatus(200))
}

const deleteProduct = (req, res) => {
  const pid = req.params.pid
  productsDao.deleteProduct(pid).then(status => res.sendStatus(200))
}

module.exports = (app) => {
  app.post('/api/products', createProduct)
  app.get('/api/products', findAllProducts)
  app.post('/api/products/search', searchProducts)
  app.put('/api/products/:pid', updateProduct)
  app.delete('/api/products/:pid', deleteProduct)
}