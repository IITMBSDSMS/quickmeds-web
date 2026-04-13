const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  medicineId: { type: String, required: true },
  name: { type: String, required: true },
  qty: { type: Number, required: true, default: 0 }
});

const pharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  inventory: [inventorySchema],
  licenseUrl: { type: String },
  isVerified: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  auditLogs: [{
    action: String,
    adminId: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

// Core indices for performance
pharmacySchema.index({ location: '2dsphere' }); // Geo-spatial index
pharmacySchema.index({ "inventory.medicineId": 1 }); // Embedded search index

module.exports = mongoose.model('Pharmacy', pharmacySchema);
