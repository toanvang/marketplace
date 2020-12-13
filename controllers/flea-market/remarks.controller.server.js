const remarksDao = require("../../daos/flea-market/remarks.dao.server")

const createRemark = (req, res) => {
  const newRemark = req.body
  remarksDao.createRemark(newRemark).then(actualRemark => res.json(actualRemark))
}

const findRemarksByProductId = (req, res) => {
  const pid = req.params.pid
  remarksDao.findRemarksByProductId(pid).then(remarks => res.json(remarks))
}

const updateRemark = (req, res) => {
  const rid = req.params.rid
  const remark = req.body
  remarksDao.updateRemark(rid, remark).then(status => res.sendStatus(200))
}

const deleteRemark = (req, res) => {
  const rid = req.params.rid
  remarksDao.deleteRemark(rid).then(status => res.sendStatus(200))
}

module.exports = (app) => {
  app.get("/api/remarks/:pid", findRemarksByProductId)
  app.post("/api/remarks", createRemark)
  app.put("/api/remarks/:rid", updateRemark)
  app.delete("/api/remarks/:rid", deleteRemark)
}