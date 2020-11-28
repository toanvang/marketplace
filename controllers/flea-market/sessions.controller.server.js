const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)

const setSession = (req, res) => {
  const name = req.params['name'];
  const value = req.params['value'];
  req.session[name] = value;
  res.send(req.session);
}

const getSession = (req, res) => {
  const name = req.params['name'];
  const value = req.session[name];
  res.send(value);
}

const getSessionAll = (req, res) => {
  res.send(req.session);
}

const resetSession = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
}

module.exports = (app) => {
  const isDevMode = process.env.NODE_ENV === 'development';
  console.log('isDevMode :' + isDevMode)
  // 1st change.
  if (!isDevMode) {
    app.set('trust proxy', 1);
  }
  app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    secret: 'any string',
    key : 'sid',
    proxy : !isDevMode, // add this when behind a reverse proxy, if you need secure cookies
    cookie: {
      sameSite: false,
      maxAge: 600000,
      httpOnly: false,
      // 2nd change.
      secure: !isDevMode,
    },
  }));
  app.get('/api/session/set/:name/:value', setSession);
  app.get('/api/session/get/:name', getSession);
  app.get('/api/session/get', getSessionAll);
  app.get('/api/session/reset', resetSession);
}