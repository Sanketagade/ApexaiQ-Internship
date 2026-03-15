const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservations');
const Restaurant = require('../models/Restaurant');

// Create reservation
router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();

    await Restaurant.findByIdAndUpdate(
      req.body.restaurant_id,
      { $inc: { tables_available: -1 } }
    );

    res.json({
      success: true,
      message: "Reservation successful",
      data: reservation
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;