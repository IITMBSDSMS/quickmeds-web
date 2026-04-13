const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const Prescription = require('../models/Prescription');

// Ensure uploads dir exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post('/upload', upload.single('prescription'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // 1. Upload image to Cloudinary securely
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'prescriptions'
    });
    const imageUrl = uploadResult.secure_url;
    
    fs.unlinkSync(req.file.path); // Free up local space

    // 2. Parse using OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Cost effective vision model
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this medical prescription. Extract the medicines, dosage, and frequency. Check for obvious drug interactions if multiple medicines are present. If the handwriting is completely unreadable, set readable to false. Respond strictly with JSON matching this structure: { \"readable\": boolean, \"medicines\": [{ \"name\": \"string\", \"dosage\": \"string\", \"frequency\": \"string\" }], \"warnings\": [\"string\"] }" },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }
      ],
      response_format: { type: "json_object" }
    });

    const parsedData = JSON.parse(response.choices[0].message.content);

    // 3. Save parsed JSON to MongoDB
    const prescription = new Prescription({
      imageUrl,
      medicines: parsedData.medicines || [],
      warnings: parsedData.warnings || [],
      readable: parsedData.readable !== undefined ? parsedData.readable : true
    });

    await prescription.save();

    res.json({ success: true, data: prescription });
  } catch (error) {
    console.error("Prescription parsing error", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
