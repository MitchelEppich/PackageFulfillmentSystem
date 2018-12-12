const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SttCacheSchema = Schema({
  cachedValues: [String]
});

module.exports = SttCacheSchema;
