const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  customer_name: { type: String, required: true },
  customer_type: { type: String, enum: ['Individual', 'Business'], default: 'Individual' },
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zip_code: String,
  discount_rate: { type: Number, default: 0 },
  credit_limit: { type: Number, default: 1000 },
  notes: String,
  is_active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);