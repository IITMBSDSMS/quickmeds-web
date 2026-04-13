const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Pharmacy = require('../models/Pharmacy');

const upload = multer({ dest: 'uploads/' });

// Upload Phase: Pharmacist uploads their license
router.post('/uploadLicense/:pharmacyId', upload.single('license'), async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Securely push to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'pharmacy_licenses'
    });
    
    fs.unlinkSync(req.file.path);

    // Update DB
    const pharmacy = await Pharmacy.findByIdAndUpdate(
      pharmacyId, 
      { 
        licenseUrl: uploadResult.secure_url, 
        isVerified: 'Pending' 
      },
      { new: true }
    );

    res.json({ success: true, data: pharmacy });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Admin Phase: Change verification status
router.post('/admin/decision', async (req, res) => {
  try {
    const { pharmacyId, adminId, decision } = req.body; // decision: 'Approved' or 'Rejected'

    if (!['Approved', 'Rejected'].includes(decision)) {
       return res.status(400).json({ error: "Invalid decision" });
    }

    const logEntry = {
      action: `Status changed to ${decision}`,
      adminId: adminId
    };

    const pharmacy = await Pharmacy.findByIdAndUpdate(
      pharmacyId,
      { 
        isVerified: decision,
        $push: { auditLogs: logEntry }
      },
      { new: true }
    );

    res.json({ success: true, data: pharmacy });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
