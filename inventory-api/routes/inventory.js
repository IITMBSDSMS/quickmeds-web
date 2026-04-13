const express = require('express');
const router = express.Router();
const Pharmacy = require('../models/Pharmacy');
const { getCache, setCache, invalidatePrefix } = require('../services/redis');
const { Client } = require('@googlemaps/google-maps-services-js');

const googleMapsClient = new Client({});

// PUT /api/inventory/updateStock
router.post('/updateStock', async (req, res) => {
  try {
    const { pharmacyId, medicineId, qty } = req.body;
    
    const result = await Pharmacy.updateOne(
      { _id: pharmacyId, "inventory.medicineId": medicineId },
      { $set: { "inventory.$.qty": qty } }
    );

    // Invalidate local radii cache since stock mutated
    await invalidatePrefix(`nearest:${medicineId}`);

    res.json({ success: true, message: 'Stock updated', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/inventory/getNearestAvailable
router.post('/getNearestAvailable', async (req, res) => {
  try {
    const { lat, lng, medicineId } = req.body;

    if (!lat || !lng || !medicineId) return res.status(400).json({ error: 'Missing parameters' });

    // Redis Geo-Caching strategy (Rounding coordinates lightly to group local queries)
    const cacheKey = `nearest:${medicineId}:${parseFloat(lat).toFixed(3)},${parseFloat(lng).toFixed(3)}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      console.log('Serving from Redis cache');
      return res.json({ success: true, data: cached, cached: true });
    }

    // MongoDB Geospatial Query to find nearby pharmacies with positive stock
    const nearbyPharmacies = await Pharmacy.find({
      location: {
        $nearSphere: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 20000 // 20km boundary
        }
      },
      inventory: { $elemMatch: { medicineId, qty: { $gt: 0 } } }
    }).limit(5);

    if (nearbyPharmacies.length === 0) {
      return res.json({ success: true, data: null, message: "Out of stock in your area" });
    }

    // Google Maps Validation
    if (!process.env.GOOGLE_MAPS_API_KEY) {
      console.log('No GMaps key, using geographic air distance.');
      await setCache(cacheKey, nearbyPharmacies[0]);
      return res.json({ success: true, data: nearbyPharmacies[0], cached: false });
    }

    // Calculate actual driving times to find the absolute closest practical store
    const origins = [{ lat, lng }];
    const destinations = nearbyPharmacies.map(p => ({
      lat: p.location.coordinates[1],
      lng: p.location.coordinates[0]
    }));

    const dmResponse = await googleMapsClient.distancematrix({
      params: {
        origins,
        destinations,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });

    let closestIndex = 0;
    let shortestDuration = Infinity;

    if (dmResponse.data.rows[0].elements) {
      dmResponse.data.rows[0].elements.forEach((element, index) => {
        if (element.status === "OK" && element.duration.value < shortestDuration) {
          shortestDuration = element.duration.value;
          closestIndex = index;
        }
      });
    }

    const nearestPharmacy = nearbyPharmacies[closestIndex];

    await setCache(cacheKey, nearestPharmacy);
    res.json({ success: true, data: nearestPharmacy, cached: false });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
