const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { protect, adminOnly } 
= require('../middleware/auth');

// bcrypt: for password hashing
const bcrypt = require('bcryptjs')

// GET /api/users - fetch all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find({}, { password: 0 });  // this excludes password field
//     res.json(users); // send safe user list
//   } catch (error) {
//     console.error('Error fetching users:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// signup with security quest
router.post('/register', async (req, res) => {
  const { name, email, password, securityAnswer } = req.body;

  if (!name || !email || !password || !securityAnswer) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    const user = new User({ name, email, password, securityAnswer });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Signup - POST /api/users/signup for bcrypt
// router.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const user = new User({ name, email, password });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// simple signup
// router.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ status: "error", error: "All fields are required" });
//   }

//   try {
//     await User.create({ name, email, password });
//     res.json({ status: "ok", message: "Registration successful!" });
//   } catch (error) {
//     if (error.code === 11000) { // Duplicate key error 11000
//       return res.status(400).json({ status: "error", error: "Email already in use" }); // 400 Bad Request
//     }
//     console.error("Register Error:", error);
//     res.status(500).json({ status: "error", error: "Internal server error" }); // 500 Internal Server Error
//   }
// });

// Login - POST /api/users/login bcrypt
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid email or password' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

//     res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // generate JWT
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/users/:id - only for admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// simple login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   // Check if email and password are provided
//   if (!email || !password) {
//     return res.status(400).json({ status: "error", error: "Email and password are required" });
//   }

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });

//     // If user is not found
//     if (!user) {
//       return res.status(400).json({ status: "error", error: "Invalid credentials" });
//     }

//     // Compare plaintext password
//     if (user.password !== password) {
//       return res.status(400).json({ status: "error", error: "Invalid credentials" });
//     }

//     // Return success message and user data (excluding password)
//     const { password: _, ...userWithoutPassword } = user.toObject();  // Exclude password
//     return res.json({ status: "ok", message: "Login successful!", user: userWithoutPassword });

//   } catch (error) {
//     console.error("Login Error:", error);  // Log the error for debugging
//     return res.status(500).json({ status: "error", error: "Internal server error" });
//   }
// });

// forget password
// router.post("/forgetpass", async (req, res) => {
//   const { email, newPassword } = req.body;

//   if (!email || !newPassword) {
//     return res.status(400).json({ message: "Email and new password are required" });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.password = newPassword; // plain password model schema will hash
//     await user.save(); //('save') hook for hashing

//     res.json({ message: "Password updated successfully" });
//   } catch (err) {
//     console.error("Forget Password Error:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// reset pass with secirity quest
router.post('/recover-password', async (req, res) => {
  const { email, securityAnswer, newPassword } = req.body;

  if (!email || !securityAnswer || !newPassword) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(securityAnswer, user.securityAnswer);
    if (!isMatch) {
      return res.status(401).json({ error: 'Security answer is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// reset with old pass
router.post('/reset-with-oldpass', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Old password is incorrect' });

    user.password = newPassword; // This will be auto-hashed in pre('save')
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error resetting with old password:', err);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;
