const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

mongoose.connect("mongodb+srv://tensai:mongoDB@cluster0.h1cav.mongodb.net/CS5610", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false})
  .then(console.log('connection ok'))
  .catch(err => console.log(`DB Connection Error: ${err.message}`));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const whitelist = [
  'http://localhost:4200',
  'http://128.92.141.42',
  'http://73.63.215.58:4200', // jiong
  'http://73.170.241.130:4200', // toan
  'http://76.103.184.26:4200', //lin
  'https://great-flea-market.herokuapp.com',
  'http://great-flea-market.herokuapp.com',
  'https://client-angular-jiongwu.herokuapp.com'
]

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
    // if (!origin || whitelist.indexOf(origin) !== -1) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
  },
  credentials: true
}
app.use(cors(corsOptions))

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

require('./controllers/quizzes.controller.server')(app)
require('./controllers/questions.controller.server')(app)
require('./controllers/quiz-attempts.controller.server')(app)
require('./controllers/flea-market/sessions.controller.server')(app)
require('./controllers/flea-market/users.controller.server')(app)
require('./controllers/flea-market/products.controller.server')(app)
require('./controllers/flea-market/remarks.controller.server')(app)

app.listen(process.env.PORT || 8080);
