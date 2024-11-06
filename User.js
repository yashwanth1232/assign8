const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Update user details
router.put('/update', async (req, res) => {
  const { id, username, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { username, email }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = router;
