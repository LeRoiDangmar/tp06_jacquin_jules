require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the auth routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
