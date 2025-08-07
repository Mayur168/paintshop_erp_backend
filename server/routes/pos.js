const express = require('express');
const POSTransaction = require('../models/POSTransaction');
const POSTransactionDetail = require('../models/POSTransactionDetail');
const Product = require('../models/Product');

const router = express.Router();

// Get all POS transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await POSTransaction.find().populate('customer_id transaction_details');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new POS transaction
router.post('/', async (req, res) => {
  const { customer_id, transaction_details, payment_method } = req.body;
  let total_amount = 0;

  try {
    const transaction = new POSTransaction({ customer_id, total_amount, payment_method });
    await transaction.save();

    for (const detail of transaction_details) {
      const product = await Product.findById(detail.product_id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      const transactionDetail = new POSTransactionDetail({
        transaction_id: transaction._id,
        product_id: detail.product_id,
        quantity: detail.quantity,
        price: product.sell_price,
      });
      await transactionDetail.save();
      total_amount += detail.quantity * product.sell_price;
      product.current_stock -= detail.quantity;
      await product.save();
    }

    transaction.total_amount = total_amount;
    transaction.transaction_details = transaction_details.map(detail => detail._id);
    await transaction.save();

    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;