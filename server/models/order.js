const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = Schema({
  invoiceId: String,
  content: String,
  status: String,
  editBy: [String],
  claimed: { type: Boolean, default: false },
  lastUpdate: { type: Date, default: Date.now }
});

module.exports = OrderSchema;
