import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// ====================
// ✅ Register Route
// ====================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: 'Please fill in all required fields.' });
    }

    // 2. Check for valid role
    const validRoles = ['speaker', 'listener'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ msg: 'Invalid role. Choose speaker or listener.' });
    }

    // 3. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: 'User with this email already exists.' });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      walletBalance: role === 'speaker' ? 0 : undefined
    });

    await newUser.save();

    // 6. Generate JWT
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 7. Respond
    res.status(201).json({
      msg: 'User registered successfully.',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        walletBalance: newUser.walletBalance
      }
    });

  } catch (err) {
    console.error('❌ Registration Error:', err.message);
    res.status(500).json({
      msg: 'Server error during registration.',
      error: err.message
    });
  }
});

// ====================
// ✅ Login Route
// ====================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required.' });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials.' });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 5. Respond
    res.status(200).json({
      msg: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        walletBalance: user.walletBalance
      }
    });

  } catch (err) {
    console.error('❌ Login Error:', err.message);
    res.status(500).json({
      msg: 'Server error during login.',
      error: err.message
    });
  }
});

export default router;
