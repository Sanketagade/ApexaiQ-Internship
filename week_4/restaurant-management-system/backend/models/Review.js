const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Restaurant ID is required']
  },
  user_name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    maxlength: [50, 'User name cannot exceed 50 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  date: {
    type: Date,
    default: Date.now
  },
  helpful_count: {
    type: Number,
    default: 0
  },
  visit_type: {
    type: String,
    enum: ['Dine-in', 'Takeout', 'Delivery', 'Other'],
    default: 'Dine-in'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
