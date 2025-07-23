const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/db');
const PORT = process.env.PORT || 5000;

// ✅ Full CORS configuration
const allowedOrigins = ['https://mern-ten-ecru.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman) or whitelisted domains
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
}));

// ✅ Handle preflight requests (OPTIONS)
app.options('*', cors());

// Middleware
app.use(express.json());

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
