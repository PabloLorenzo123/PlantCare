import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

import { JWT_SECRET } from '../server.js';

const router = express.Router();



router.post('/signup', async (req, res) => {
    console.log(req.body)
    const { name, email, password} = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create a new user object
        const newUser = new User({
            name,
            email,
            passwordHash: password, // Will be hashed before saving
        });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        newUser.passwordHash = await bcrypt.hash(newUser.passwordHash, salt);

        // Save the new user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with token and user data
        res.status(201).json({
            message: 'User created successfully',
            token, // The JWT token
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
