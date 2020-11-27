const session = require('express-session')

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
  app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
  }));
  app.get('/api/session/set/:name/:value', setSession);
  app.get('/api/session/get/:name', getSession);
  app.get('/api/session/get', getSessionAll);
  app.get('/api/session/reset', resetSession);
}