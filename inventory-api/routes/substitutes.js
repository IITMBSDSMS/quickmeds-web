const express = require('express');
const router = express.Router();
const Substitute = require('../models/Substitute');
const Pharmacy = require('../models/Pharmacy');
const { getCache, setCache } = require('../services/redis');

// Fetch ranked alternatives
router.get('/:medicineName', async (req, res) => {
  try {
    const { medicineName } = req.params;
    
    // Check Redis Cache
    const cacheKey = `substitutes:${medicineName.toLowerCase()}`;
    const cached = await getCache(cacheKey);
    if (cached) return res.json({ success: true, data: cached, cached: true });

    // Fetch DB mapping
    const mapping = await Substitute.findOne({ medicineName: medicineName.toLowerCase() });
    
    if (!mapping || mapping.alternatives.length === 0) {
      return res.json({ success: true, data: [], message: "No substitutes found." });
    }

    // Rank 1: Sort by Price (Cheapest generic first)
    const sortedAlts = mapping.alternatives.sort((a, b) => a.price - b.price);

    // Rank 2: Availability Verification
    // Dynamically query inventory across the database to see which substitutes are actively in stock right now
    const altNames = sortedAlts.map(a => a.name);
    const availablePharmacies = await Pharmacy.find({
       "inventory.medicineId": { $in: altNames },
       "inventory.qty": { $gt: 0 }
    }).select('inventory');

    const availableAltNames = new Set();
    availablePharmacies.forEach(p => {
       p.inventory.forEach(inv => {
         if (inv.qty > 0) availableAltNames.add(inv.medicineId);
       });
    });

    const results = sortedAlts.map(alt => ({
      ...alt._doc,
      isAvailableNearby: availableAltNames.has(alt.name)
    }));

    // Cache results for 1 hour to prevent DB spikes
    await setCache(cacheKey, results, 3600);

    res.json({ success: true, data: results, cached: false });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Admin Endpoint: Seed database
router.post('/', async (req, res) => {
   try {
      const sub = new Substitute(req.body);
      await sub.save();
      res.json({ success: true, data: sub });
   } catch(e) {
      res.status(500).json({ error: e.message});
   }
});

module.exports = router;
