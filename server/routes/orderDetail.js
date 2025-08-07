const express = require('express');
const router = express.Router();
const OrderDetail = require('../models/OrderDetail'); // Adjust path to your model

// Create a new order detail
router.post('/', async (req, res) => {
  try {
    const { order_id, product_id, quantity, price } = req.body;
    
    // Validate required fields
    if (!order_id || !product_id || !quantity || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const orderDetail = new OrderDetail({
      order_id,
      product_id,
      quantity,
      price
    });
    
    const savedOrderDetail = await orderDetail.save();
    res.status(201).json(savedOrderDetail);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order detail', error: error.message });
  }
});

// Get all order details
router.get('/', async (req, res) => {
  try {
    const orderDetails = await OrderDetail.find()
      .populate('order_id')
      .populate('product_id');
    res.json(orderDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details', error: error.message });
  }
});

// Get a specific order detail by ID
router.get('/:id', async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findById(req.params.id)
      .populate('order_id')
      .populate('product_id');
      
    if (!orderDetail) {
      return res.status(404).json({ message: 'Order detail not found' });
    }
    
    res.json(orderDetail);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order detail', error: error.message });
  }
});

// Update an order detail
router.put('/:id', async (req, res) => {
  try {
    const { quantity, price } = req.body;
    
    // Validate update fields
    if (!quantity && !price) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }
    
    const updateData = {};
    if (quantity) updateData.quantity = quantity;
    if (price) updateData.price = price;
    
    const orderDetail = await OrderDetail.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!orderDetail) {
      return res.status(404).json({ message: 'Order detail not found' });
    }
    
    res.json(orderDetail);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order detail', error: error.message });
  }
});

// Delete an order detail
router.delete('/:id', async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findByIdAndDelete(req.params.id);
    
    if (!orderDetail) {
      return res.status(404).json({ message: 'Order detail not found' });
    }
    
    res.json({ message: 'Order detail deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order detail', error: error.message });
  }
});

module.exports = router;