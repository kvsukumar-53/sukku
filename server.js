const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for demo purposes (replace with database in production)
let users = [];

// POST /users - Handle user registration
app.post('/users', (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    // Basic validation
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password, // In production, hash the password!
      mobile,
      createdAt: new Date().toISOString()
    };

    // Save user
    users.push(newUser);

    // Return success response (don't send password back)
    const userResponse = { ...newUser };
    delete userResponse.password;
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /users - Get all users (for testing purposes)
app.get('/users', (req, res) => {
  // Return users without passwords
  const usersWithoutPasswords = users.map(user => {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  });
  res.json({
    success: true,
    users: usersWithoutPasswords
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Users endpoint: http://localhost:${PORT}/users`);
});