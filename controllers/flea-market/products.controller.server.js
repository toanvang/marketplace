const productsDao = require("../../daos/flea-market/products.dao.server")

const createProduct = (req, res) => {
  const newProduct = req.body;
  console.log(JSON.stringify(newProduct))
  productsDao.createProduct(newProduct)
    .then(actualProduct => {
      res.json(actualProduct)
    })
}

module.exports = (app) => {
  app.post('/api/products', createProduct)
}