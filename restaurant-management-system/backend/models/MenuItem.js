const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Restaurant ID is required']
  },
  item_name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    // enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Salad', 'Soup', 'Sides', 'Special']
     enum: [
      'Starter',
      'Breakfast',
      'Appetizer',
      'Main Course',
      'Dessert',
      'Beverage',
      'Salad',
      'Soup',
      'Sides',
      'Special'
    ]
  // },
  },
  image: {
    type: String,
    default: ''
  },
  is_available: {
    type: Boolean,
    default: true
  },
  is_vegetarian: {
    type: Boolean,
    default: false
  },
  is_vegan: {
    type: Boolean,
    default: false
  },
  is_gluten_free: {
    type: Boolean,
    default: false
  },
  spicy_level: {
    type: Number,
    min: 0,
    max: 3,
    default: 0
  },
  preparation_time: {
    type: Number,
    default: 15 // minutes
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
