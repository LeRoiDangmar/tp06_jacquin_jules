require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products')
const cors = require('cors')

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
const corsOptions = {
     origin: '*', // Allow all origins
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization'],
   };
  
app.use(cors(corsOptions));

// Mount the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
