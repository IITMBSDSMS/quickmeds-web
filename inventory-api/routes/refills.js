const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

router.post('/subscribe', async (req, res) => {
  try {
    const { userId, medicineList, planType } = req.body;

    // Fast-foward next cycle dates
    const daysToAdd = planType === 'Monthly' ? 30 : 7;
    const nextRefillDate = new Date();
    nextRefillDate.setDate(nextRefillDate.getDate() + daysToAdd);

    const sub = new Subscription({
      userId,
      medicineList,
      planType,
      nextRefillDate
    });

    await sub.save();
    res.json({ success: true, data: sub });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
