const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId }).populate('prescriptions');
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, medicalHistory, chronicDiseases, reminders } = req.body;
    let profile = await Profile.findOne({ userId });

    if (profile) {
      // Update existing
      if (medicalHistory) profile.medicalHistory = medicalHistory;
      if (chronicDiseases) profile.chronicDiseases = chronicDiseases;
      if (reminders) profile.reminders = reminders;
      await profile.save();
    } else {
      // Create new
      profile = new Profile(req.body);
      await profile.save();
    }

    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:userId/addPrescription', async (req, res) => {
  try {
    const { prescriptionId } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.userId },
      { $addToSet: { prescriptions: prescriptionId } },
      { new: true, upsert: true } // Creates profile if one doesnt exist
    );
    res.json({ success: true, profile });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
