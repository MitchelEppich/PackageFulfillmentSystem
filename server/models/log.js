const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LogSchema = Schema({
  who: String,
  task: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = LogSchema;
