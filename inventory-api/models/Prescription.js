const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String },
  frequency: { type: String }
});

const prescriptionSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  medicines: [medicineSchema],
  warnings: [{ type: String }],
  readable: { type: Boolean, default: true },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
