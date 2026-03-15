const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  name: String,
  phone: String,
  guests: Number,
  date: String,
  time: String
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);