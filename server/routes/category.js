// const express = require('express');
// const Category = require('../models/Category');

// const router = express.Router();

// // Get all categories
// router.get('/', async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add a new category
// router.post('/', async (req, res) => {
//   const category = new Category({
//     category_name: req.body.category_name,
//   });
//   try {
//     const newCategory = await category.save();
//     res.status(201).json(newCategory);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete a category
// router.delete('/:id', async (req, res) => {
//   try {
//     await Category.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Category deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new category
router.post('/', async (req, res) => {
  const category = new Category({
    category_name: req.body.category_name,
  });
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a category
router.patch('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    if (req.body.category_name != null) {
      category.category_name = req.body.category_name;
    }
    
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;