const mongoose = require("mongoose")
const remarksSchema = require("./remarks.schema.server")
const remarksModel = mongoose.model("RemardsModel", remarksSchema)
module.exports = remarksModel