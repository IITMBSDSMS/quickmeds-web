const mongoose = require('mongoose');

const substituteSchema = new mongoose.Schema({
  medicineName: { type: String, required: true, lowercase: true, index: true },
  alternatives: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    isGeneric: { type: Boolean, default: true },
    manufacturer: { type: String }
  }]
});

module.exports = mongoose.model('Substitute', substituteSchema);
