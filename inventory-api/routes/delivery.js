const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');
const { Client } = require('@googlemaps/google-maps-services-js');
const { getIo } = require('../services/socket');

const googleMapsClient = new Client({});

// Optimizae driver routes across multiple dropoffs
router.post('/optimize', async (req, res) => {
  try {
    const { driverId, driverLocation, orders } = req.body;
    // orders = [{ orderId, address, location: {lat, lng} }]

    if (!process.env.GOOGLE_MAPS_API_KEY) {
      return res.status(400).json({ error: 'Google Maps API key required for route optimization' });
    }

    const waypoints = orders.map(o => ({
      lat: o.location.lat,
      lng: o.location.lng
    }));

    // Use Google Maps Distance Matrix TSP heuristics using optimize:true
    const directionsResponse = await googleMapsClient.directions({
      params: {
        origin: driverLocation, 
        destination: waypoints[waypoints.length - 1], // Placeholder, GMaps restructures it
        waypoints: waypoints.map(w => ({ location: w, stopover: true })),
        optimize: true,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });

    const route = directionsResponse.data.routes[0];
    const waypointOrder = route.waypoint_order; // [2, 0, 1] goes to order 2 first, then 0

    const optimizedOrders = waypointOrder.map((originalIndex, stepNumber) => ({
      orderId: orders[originalIndex].orderId,
      stepOrder: stepNumber + 1,
      // Minimal extracted instructions
      instructions: route.legs[stepNumber].steps.map(s => s.html_instructions.replace(/<[^>]*>?/gm, '')).join(' | ')
    }));

    const delivery = new Delivery({
      driverId,
      orders: orders.map(o => ({
        ...o,
        location: { type: 'Point', coordinates: [o.location.lng, o.location.lat] }
      })),
      optimizedRoute: optimizedOrders
    });

    await delivery.save();

    res.json({ success: true, optimizedRoute: optimizedOrders, deliveryId: delivery._id });
  } catch (error) {
    console.error("Route Optimization Error", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/status', async (req, res) => {
   const { deliveryId, status } = req.body;
   try {
     const del = await Delivery.findByIdAndUpdate(deliveryId, { status }, { new: true });
     
     getIo().to(deliveryId).emit('status_update', { deliveryId, status });
     res.json({ success: true, data: del });
   } catch(e) {
     res.status(500).json({ error: e.message });
   }
});

module.exports = router;
