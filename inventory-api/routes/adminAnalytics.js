const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');

// Aggregation Pipeline fetching total counts by order status
router.get('/kpis', async (req, res) => {
  try {
    const pipeline = [
      { $unwind: "$orders" },
      { 
        $group: {
          _id: "$orders.status",
          count: { $sum: 1 }
        }
      }
    ];
    
    const results = await Delivery.aggregate(pipeline);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint tracking all systemic failures 
router.get('/failures', async (req, res) => {
  try {
    // Queries all canceled, rejected, or globally failed driver deliveries
    const failures = await Delivery.find({ status: { $in: ['Failed', 'Rejected', 'Cancelled'] }});
    res.json({ success: true, count: failures.length, data: failures });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
