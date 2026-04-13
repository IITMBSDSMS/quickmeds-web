const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  frequencyString: { type: String }, // e.g. "every 8 hours"
  cronSchedule: { type: String }, // e.g., "0 */8 * * *"
  active: { type: Boolean, default: true }
});

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  medicalHistory: [{ type: String }],
  chronicDiseases: [{ type: String }],
  prescriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  }],
  reminders: [reminderSchema]
});

module.exports = mongoose.model('Profile', profileSchema);
