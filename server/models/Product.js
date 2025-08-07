const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
  supplier_id: { type: Schema.Types.ObjectId, ref: 'Supplier' },
  brand: String,
  current_stock: { type: Number, default: 0 },
  min_stock: { type: Number, default: 0 },
  max_stock: { type: Number, default: 100 },
  unit: String,
  sell_price: { type: Number, default: 0 },
  cost_price: { type: Number, default: 0 },
  color: String,
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);