const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Restaurant = require('../models/Restaurant');

// GET /api/reviews/:restaurant_id - Get reviews for a restaurant
router.get('/:restaurant_id', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'newest' } = req.query;
    
    let sortQuery = { date: -1 };
    if (sort === 'oldest') sortQuery = { date: 1 };
    if (sort === 'highest') sortQuery = { rating: -1 };
    if (sort === 'lowest') sortQuery = { rating: 1 };
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Review.countDocuments({ restaurant_id: req.params.restaurant_id });
    const reviews = await Review.find({ restaurant_id: req.params.restaurant_id })
      .sort(sortQuery)
      .skip(skip)
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      data: reviews,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/reviews - Submit a review
router.post('/', async (req, res) => {
  try {
    const { restaurant_id, user_name, rating, comment, visit_type } = req.body;
    
    if (!restaurant_id || !user_name || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    const review = new Review({ restaurant_id, user_name, rating, comment, visit_type });
    await review.save();
    
    // Update restaurant average rating
    const allReviews = await Review.find({ restaurant_id });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    
    await Restaurant.findByIdAndUpdate(restaurant_id, {
      average_rating: Math.round(avgRating * 10) / 10,
      total_reviews: allReviews.length
    });
    
    res.status(201).json({ success: true, data: review, message: 'Review submitted successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/reviews/:id - Delete a review
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    
    // Recalculate average rating
    const allReviews = await Review.find({ restaurant_id: review.restaurant_id });
    const avgRating = allReviews.length > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      : 0;
    
    await Restaurant.findByIdAndUpdate(review.restaurant_id, {
      average_rating: Math.round(avgRating * 10) / 10,
      total_reviews: allReviews.length
    });
    
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
