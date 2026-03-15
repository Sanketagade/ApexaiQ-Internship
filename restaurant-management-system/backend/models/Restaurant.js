
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },

  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },

  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },

  address: {
    type: String,
    required: [true, 'Address is required']
  },

  phone: {
    type: String,
    trim: true
  },

  email: {
    type: String,
    trim: true,
    lowercase: true
  },

  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
  },

  cuisine_type: {
    type: String,
    required: true
  },

  opening_time: {
    type: String,
    required: [true, 'Opening time is required']
  },

  closing_time: {
    type: String,
    required: [true, 'Closing time is required']
  },

  price_range: {
    type: String,
    enum: ["₹", "₹₹", "₹₹₹"],
    default: '₹'
  },

  average_rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },

  total_reviews: {
    type: Number,
    default: 0
  },

  is_active: {
    type: Boolean,
    default: true
  },

  features: [{
    type: String
  }],

  // ⭐ TABLE MANAGEMENT
  total_tables: {
    type: Number,
    default: 30
  },

  tables_available: {
    type: Number,
    default: 30
  },

  tables_reserved: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

// Index for search
restaurantSchema.index({ name: 'text', location: 'text', cuisine_type: 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema);


