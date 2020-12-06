const usersModel = require("../../models/flea-market/users/users.model.server")

const createUser = (newUser) => usersModel.create(newUser)
const findUserByCredentials = (username, password) => usersModel.find({username, password})

const updateUser = (uid, user) => usersModel.findByIdAndUpdate(uid, user)

const findUserById = (uid) => usersModel.findById(uid)

module.exports = {createUser, findUserByCredentials, updateUser, findUserById}
