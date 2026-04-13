const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  orders: [{
    orderId: { type: String },
    address: { type: String },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number] } // [lng, lat]
    },
    status: { type: String, default: 'Pending' }
  }],
  optimizedRoute: [{
    orderId: String,
    stepOrder: Number,
    instructions: String
  }],
  status: { type: String, default: 'Assigned' } // Assigned, In Transit, Delivered
});

module.exports = mongoose.model('Delivery', deliverySchema);
