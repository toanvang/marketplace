const quizService = require('../services/quizzes.service.server')
module.exports = (app) => {
  const findAllQuizzes = (req, res) =>
    res.send(quizService.findAllQuizzes())

  const findQuizById = (req, res) => {
    const quizId = req.params['qid']
    const quiz = quizService.findQuizById(quizId)
    res.json(quiz)
  }

  app.get('/api/quizzes', findAllQuizzes)
  app.get('/api/quizzes/:qid', findQuizById)
}
