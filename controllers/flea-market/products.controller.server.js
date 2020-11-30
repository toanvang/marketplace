const productsDao = require("../../daos/flea-market/products.dao.server")

const fs = require('fs')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace('.', '-' + Date.now() + '.'))
  }
});

const upload = multer({ storage: storage });

const createProduct = (req, res) => {
  // console.log(JSON.stringify(req.file))
  // console.log(path.join(__dirname + '/../../uploads/' + req.file.filename))
  const newProduct = req.body;
  console.log("createProduct: " + JSON.stringify(newProduct))
  newProduct.location = JSON.parse(newProduct.location)
  newProduct.images = [{
    data: fs.readFileSync(path.join(__dirname + '/../../uploads/' + req.file.filename), {encoding: 'base64'}),
    contentType: 'image/png'
  }]
  productsDao.createProduct(newProduct)
    .then(actualProduct => res.json(actualProduct))
}

const findAllProducts = (req, res) =>
  productsDao.findAllProducts().then(products => {
    // console.log("findAllProducts: " + JSON.stringify(products))
    res.json(products)
  })

const searchProducts = (req, res) => {
  const searchConditions = req.body
  // console.log("searchProducts" + JSON.stringify(searchConditions))
  productsDao.searchProducts(searchConditions).then(products => {
    console.log("searchProducts products: " + JSON.stringify(products))
    res.json(products)
  })
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
  app.post('/api/products', upload.single('image'), createProduct)
  app.get('/api/products', findAllProducts)
  app.post('/api/products/search', searchProducts)
  app.put('/api/products/:pid', updateProduct)
  app.delete('/api/products/:pid', deleteProduct)
}