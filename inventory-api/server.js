require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

// Route Imports
const inventoryRoutes = require('./routes/inventory');
const prescriptionRoutes = require('./routes/prescriptions');
const deliveryRoutes = require('./routes/delivery');
const profileRoutes = require('./routes/profiles');

// New Architectural Modules
const substituteRoutes = require('./routes/substitutes');
const verificationRoutes = require('./routes/verification');
const adminAnalyticsRoutes = require('./routes/adminAnalytics');
const refillRoutes = require('./routes/refills');

// Background Services
const { initSocket } = require('./services/socket');
const { initCronJobs } = require('./services/cron');

const app = express();
app.use(cors());
app.use(express.json());

// Upgrade Express with an HTTP Server to support Socket.io
const server = http.createServer(app);
initSocket(server);

// Kick off medication reminder chron jobs
initCronJobs();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quickmeds_inventory')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Mount the Healthcare API modules
app.use('/api/inventory', inventoryRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/profiles', profileRoutes);

// New Architectural Mounts
app.use('/api/substitutes', substituteRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/admin/analytics', adminAnalyticsRoutes);
app.use('/api/refills', refillRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Comprehensive Healthcare Backend running on port ${PORT}`);
});
