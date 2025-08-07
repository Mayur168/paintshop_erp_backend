const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const posTransactionSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: 'Customer' },
  transaction_date: { type: Date, default: Date.now },
  total_amount: { type: Number, default: 0 },
  payment_method: { type: String, enum: ['cash', 'card'], default: 'cash' },
  transaction_details: [{ type: Schema.Types.ObjectId, ref: 'POSTransactionDetail' }],
}, { timestamps: true });

module.exports = mongoose.model('POSTransaction', posTransactionSchema);