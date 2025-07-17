

import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Optional test route
router.get('/test', (req, res) => {
  res.send('Auth route is working!');
});

export default router;
