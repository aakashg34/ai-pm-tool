const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model
const JWT_SECRET = process.env.JWT_SECRET || 'pmtool';

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login User
const loginUser = async (req, res) => {
    console.log(req.body, "request body"); // To see the incoming request body

    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        console.log(user, "user from DB"); // To check if user is fetched

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid, "password validation"); // To check if password comparison works

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET, // Make sure you are using process.env.JWT_SECRET here
            { expiresIn: '1h' }
        );
        console.log(user._id, "userid")
        console.log(token, "token is here")

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error("Error during login: ", error); // Log full error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
