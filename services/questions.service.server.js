const questionsDao = require('../daos/questions.dao.server')
const findAllQuestions = () => questionsDao.findAllQuestions()
const findQuestionById = (qid) => questionsDao.findQuestionById(qid)
const findQuestionsForQuiz = (qzid) => questionsDao.findQuestionsForQuiz(qzid)
module.exports = { findAllQuestions, findQuestionById, findQuestionsForQuiz }