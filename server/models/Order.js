

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: 'Customer' },
  product_name: { type: String},
  order_date: { type: Date, default: Date.now },
  subtotal: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total_amount: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled']},
  order_details: [{ type: Schema.Types.ObjectId, ref: 'OrderDetail' }],
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);