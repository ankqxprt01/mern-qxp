const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/db');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// app.use(cors({
//   origin: 'https://mern-ten-ecru.vercel.app',
//   credentials: true
// }));

// API Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Serve React frontend
const path = require('path');
app.use(express.static(path.join(__dirname, './client/build')));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
