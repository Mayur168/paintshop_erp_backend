const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const posTransactionDetailSchema = new Schema({
  transaction_id: { type: Schema.Types.ObjectId, ref: 'POSTransaction' },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('POSTransactionDetail', posTransactionDetailSchema);