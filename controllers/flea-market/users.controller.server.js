const usersDao = require('../../daos/flea-market/users.dao.server')

const register = (req, res) => {
  const newUser = req.body;
  usersDao.createUser(newUser)
    .then(actualUser => {
      req.session["currentUser"] = actualUser
      res.json(actualUser)
    })
}

const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  usersDao.findUserByCredentials(username, password)
    .then(user => {
      if(user.length) {
        console.log("login :" + JSON.stringify(user))
        req.session["currentUser"] = user[0]

        console.log("login cookie:" + JSON.stringify(req.headers.cookie))
        console.log("login sessionId:" + req.sessionID + " " + JSON.stringify(req.session))
        res.send(user[0])
      } else {
        res.sendStatus(403)
      }
    })
}

const currentUser = (req, res) => {
  console.log("currentUser cookie:" + JSON.stringify(req.headers.cookie))
  console.log("currentUser :" + req.sessionID + " " + JSON.stringify(req.session))
  const currentUser = req.session["currentUser"]
  console.log("currentUser: " + JSON.stringify(currentUser))
  if (currentUser)
    res.json(currentUser)
  else
    res.sendStatus(404)
}

const logout = (req, res) => {
  req.session.destroy()
  res.sendStatus(200)
}

module.exports = (app) => {
  app.post('/api/login', login)
  app.post('/api/register', register)
  app.post('/api/currentUser', currentUser)
  app.post('/api/logout', logout)
}