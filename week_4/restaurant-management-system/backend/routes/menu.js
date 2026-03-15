const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// GET /api/menu/:restaurant_id - Get menu items for a restaurant
router.get('/:restaurant_id', async (req, res) => {
  try {
    const { category, available_only } = req.query;
    let query = { restaurant_id: req.params.restaurant_id };
    
    if (category) query.category = category;
    if (available_only === 'true') query.is_available = true;
    
    const items = await MenuItem.find(query).sort({ category: 1, item_name: 1 });
    
    // Group by category
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
    
    res.json({ success: true, data: items, grouped });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/menu - Add menu item
router.post('/', async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json({ success: true, data: item, message: 'Menu item added successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/menu/:id - Update menu item
router.put('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ success: false, message: 'Menu item not found' });
    res.json({ success: true, data: item, message: 'Menu item updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/menu/:id - Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Menu item not found' });
    res.json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
