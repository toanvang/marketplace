const remarksModel = require("../../models/flea-market/remarks/remarks.model.server")

const createRemark = (newRemark) => remarksModel.create(newRemark)

const findRemarksByProductId = (pid) =>
  remarksModel.find({product: pid}).populate('author', 'username _id')

const updateRemark = (rid, remark) => remarksModel.findByIdAndUpdate(rid, remark)

const deleteRemark = (rid) => remarksModel.deleteOne({_id: rid})

module.exports = {createRemark, findRemarksByProductId, updateRemark, deleteRemark}