import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

// Function to create a JWT token
const createToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Token expires in 1 day
  } catch (error) {
    console.error('Error generating token:', error.message);
    throw new Error('Token generation failed');
  }
};

// Controller to handle user registration
const registerUser = async (req, res) => {
  try {
    const { email, password, profile } = req.body;

    // Validate input
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    // Save the user to the database
    const newUser = new User({
      email,
      password,
      profile,
    });

   


    const user = await newUser.save();
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Controller to handle user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    // Retrieve user with password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// fetch user details
const getUser = async (req,res) =>{
  try{
     const userId = req.params.id;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  }catch (eror){
     console.error('Error fetching user details:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export { loginUser, registerUser ,getUser};