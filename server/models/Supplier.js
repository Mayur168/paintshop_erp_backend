const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  supplier_name: { type: String, required: true },
  contact_person: String,
  email: String,
  phone: String,
  address: String,
  company_name: String,
  tax_id: String,
  notes: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);