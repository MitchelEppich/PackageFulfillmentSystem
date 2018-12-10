const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = Schema({
  invoiceId: String,
  invoiceNumber: String,
  itemContent: String,
  entryContent: String,
  orderDate: String,
  customerName: String,
  companyName: String,
  status: String,
  editBy: [String],
  claimed: { type: Boolean, default: false },
  lastUpdate: { type: Date, default: Date.now },
  notes: [String],
  totalItems: Number,
  customerEmail: String,
  customerPhone: String,
  totalCost: Number
});

module.exports = OrderSchema;
