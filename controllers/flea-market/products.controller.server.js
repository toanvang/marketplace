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
  newProduct.location = JSON.parse(newProduct.location)
  newProduct.images = [{
    data: fs.readFileSync(path.join(__dirname + '/../../uploads/' + req.file.filename)),
    contentType: 'image/png'
  }]
  productsDao.createProduct(newProduct)
    .then(actualProduct => res.json(actualProduct))
}

const updateProduct = (req, res) => {
  const pid = req.params.pid
  const product = req.body;
  productsDao.updateProduct(pid, product).then(status => res.sendStatus(200))
}

const findAllProducts = (req, res) =>
  productsDao.findAllProducts().then(products => {
    // console.log("findAllProducts: " + JSON.stringify(products))
    let results = products.map(product => {
      return {
        ...product.toJSON(),
          image: product.images[0].data.toString('base64')
      }
    })
    res.json(results)
  })

const findProductById = (req, res) => {
  const pid = req.params.pid
  productsDao.findProductById(pid).then(product => {
    // console.log("findAllProducts: " + JSON.stringify(products))
    let result = {
      ...product.toJSON(),
      image: product.images[0].data.toString('base64')
    }
    res.json(result)
  })
}

const searchProducts = (req, res) => {
  const searchConditions = req.body
  // console.log("searchProducts" + JSON.stringify(searchConditions))
  productsDao.searchProducts(searchConditions).then(products => {
    console.log("searchProducts products: " + JSON.stringify(products))
    res.json(products)
  })
}

const deleteProduct = (req, res) => {
  const pid = req.params.pid
  productsDao.deleteProduct(pid).then(status => res.sendStatus(200))
}

module.exports = (app) => {
  // productsDao.findProductById('5fc45a4d3c158037fd843d89').then(product => {
  //   console.log(product.images[0].data.toString('base64').slice(0, 10))
  //   // console.log(product.images[0].data.toJSON())
  //   return fs.writeFileSync(path.join(__dirname + '/../../uploads/test.img'), product.images[0].data)
  // })
  try {
    fs.mkdirSync(path.join(__dirname, '/../../uploads/'))
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }

  app.post('/api/products', upload.single('image'), createProduct)
  app.get('/api/products', findAllProducts)
  app.get('/api/products/:pid', findProductById)
  app.post('/api/products/search', searchProducts)
  app.put('/api/products/:pid', updateProduct)
  app.delete('/api/products/:pid', deleteProduct)
}