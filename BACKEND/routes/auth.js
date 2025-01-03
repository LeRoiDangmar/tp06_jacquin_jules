const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {updateUsers, getUsers, addUser } = require('../includes/userManager');
const fs = require('fs');
require('dotenv').config();
const path = require('path');

const router = express.Router();

const jsonFilePath = path.join("./mock_data/", 'users.json');

/**
 * Initializes the application by loading users and setting up watchers.
 */
async function init() {
    // Initial load of users
    await updateUsers(jsonFilePath);
    console.log('Current Users:', getUsers());

    // Watch for changes in the JSON file and update users accordingly
    watchUsersFile(jsonFilePath);
}

/**
 * Watches the JSON file for changes and updates the users variable when changes occur.
 * @param {string} filePath - The path to the JSON file.
 */
function watchUsersFile(filePath) {
    const fs = require('fs');

    // Watch the file for changes
    fs.watch(filePath, async (eventType, filename) => {
        if (eventType === 'change') {
            console.log(`${filename} has changed. Updating users...`);
            await updateUsers(filePath);
            console.log('Updated Users:', getUsers());
        }
    });

    console.log('Watching for changes in users.json...');
}


router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if user already exists
      const existingUser = getUsers().find((user) => user.username === username);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user object
      await addUser(jsonFilePath, {name: username, password: hashedPassword});
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  });
  
  /**
   * Login route:
   * Checks user credentials, issues JWT.
   */
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find user by username
      const user = getUsers().find((user) => user.name === username);
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Create a JWT payload
      const payload = {
        username: user.username,
      };
  
      // Sign the token
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  });
  
  /**
   * Protected route:
   * Only accessible if a valid token is provided.
   */
  router.get('/protected', verifyToken, (req, res) => {
    // If we got here, it means the token was valid.
    res.status(200).json({ message: `Hello, ${req.user.name}! You have accessed a protected route.` });
  });
  
  /**
   * Middleware to verify the JWT token
   */
  function verifyToken(req, res, next) {
    // Check 'Authorization' header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    // Token format: 'Bearer <token>'
    const token = authHeader.split(' ')[1];
    
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      // Decoded token includes payload (e.g., username)
      req.user = decoded;
      next();
    });
  }

// Start the application
init();


module.exports = router;
