const User = require('../models/User');

// Controller for user signup
const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validate input data here

    // Create a new user in MongoDB (without password hashing)
    const newUser = new User({
      username,
      password, // Store the password as plain text (not recommended for production)
      email,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for user login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input data here

    // Find the user by username or email
    const user = await User.findOne({ $or: [{ username }, { email: username }] });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the stored password (plain text)
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { signup, login };
