// const quizService = require('../services/quizzes.service.server')
// module.exports = (app) => {
//   const findAllQuizzes = (req, res) =>
//     res.send(quizService.findAllQuizzes())
//
//   const findQuizById = (req, res) => {
//     const quizId = req.params['qid']
//     const quiz = quizService.findQuizById(quizId)
//     res.json(quiz)
//   }
//
//   app.get('/api/quizzes', findAllQuizzes)
//   app.get('/api/quizzes/:qid', findQuizById)
// }
const quizzesService = require('../services/quizzes.service.server')
module.exports = function (app) {
  app.get('/api/quizzes', (req, res) =>
    quizzesService.findAllQuizzes()
      .then(allQuizzes => res.json(allQuizzes)))
  app.get('/api/quizzes/:qzid', (req, res) =>
    quizzesService.findQuizById(req.params['qzid'])
      .then(quiz => res.json(quiz)))
}
