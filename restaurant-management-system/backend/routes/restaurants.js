const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Review = require('../models/Review');

// GET /api/restaurants - Get all restaurants with optional search/filter
router.get('/', async (req, res) => {
  try {
    const { search, min_rating, cuisine, price_range, page = 1, limit = 20 } = req.query;
    
    let query = { is_active: true };
    
    // Search by text
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { cuisine_type: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by minimum rating
    if (min_rating) {
      query.average_rating = { $gte: parseFloat(min_rating) };
    }
    
    // Filter by cuisine
    if (cuisine) {
      query.cuisine_type = { $regex: cuisine, $options: 'i' };
    }
    
    // Filter by price range
    if (price_range) {
      query.price_range = price_range;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Restaurant.countDocuments(query);
    const restaurants = await Restaurant.find(query)
      .sort({ average_rating: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      data: restaurants,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/restaurants/:id - Get restaurant details
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    
    // Get menu items grouped by category
    const menuItems = await MenuItem.find({ restaurant_id: req.params.id });
    const groupedMenu = menuItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
    
    res.json({
      success: true,
      data: {
        ...restaurant.toObject(),
        menu: groupedMenu,
        menu_items: menuItems
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/restaurants - Add new restaurant (admin)
router.post('/', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json({ success: true, data: restaurant, message: 'Restaurant created successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/restaurants/:id - Update restaurant
router.put('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    res.json({ success: true, data: restaurant, message: 'Restaurant updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/restaurants/:id - Delete restaurant
router.delete('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { is_active: false },
      { new: true }
    );
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    res.json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/restaurants/:id/stats - Get restaurant stats
router.get('/:id/stats', async (req, res) => {
  try {
    const reviewStats = await Review.aggregate([
      { $match: { restaurant_id: require('mongoose').Types.ObjectId(req.params.id) } },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);
    
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviewStats.forEach(s => { ratingDistribution[s._id] = s.count; });
    
    res.json({ success: true, data: { rating_distribution: ratingDistribution } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;



