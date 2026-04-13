const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  medicineList: [{ 
     medicineId: String, 
     qty: Number 
  }],
  planType: { type: String, enum: ['Weekly', 'Monthly'] },
  nextRefillDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
