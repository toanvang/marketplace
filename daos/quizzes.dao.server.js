const quizzesModel = require('../models/quizzes/quizzes.model.server')
const findAllQuizzes = () => quizzesModel.find()
const findQuizById = (quizId) => quizzesModel.findById(quizId)
module.exports = { findAllQuizzes, findQuizById }