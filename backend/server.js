import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { connectDb } from "./config/db.js";

import User from "./models/User.js";

dotenv.config();

const app = express();

// JWT Secret Key (store this in a .env file for security)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

app.post('/plants', async (req, res) => {
    const { userId, name, plantTypeId, lightRequirement, temperatureRange, humidityRange, soilMoistureThreshold, imageUrl, location } = req.body;
    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the plant type exists
        const plantType = await PlantType.findById(plantTypeId);
        if (!plantType) {
            return res.status(400).json({ message: 'PlantType not found' });
        }

        // Create a new plant object, setting default values and overriding with user preferences if provided
        const newPlant = new Plant({
            user: userId,
            name,
            plantType: plantTypeId,
            lightRequirement: lightRequirement || plantType.lightRequirement, // Default to PlantType value if not provided
            temperatureRange: {
                min: temperatureRange?.min || plantType.temperatureRange.min, // Default to PlantType min if not provided
                max: temperatureRange?.max || plantType.temperatureRange.max, // Default to PlantType max if not provided
            },
            humidityRange: {
                min: humidityRange?.min || plantType.humidityRange.min, // Default to PlantType min if not provided
                max: humidityRange?.max || plantType.humidityRange.max, // Default to PlantType max if not provided
            },
            soilMoistureThreshold: soilMoistureThreshold || plantType.soilMoistureThreshold, // Default to PlantType value if not provided
            imageUrl,
            location,
        });

        // Save the new plant to the database
        await newPlant.save();

        // Send the newly created plant data as a response
        res.status(201).json({
            message: 'Plant created successfully',
            plant: {
                id: newPlant._id,
                name: newPlant.name,
                user: newPlant.user,
                plantType: newPlant.plantType,
                lightRequirement: newPlant.lightRequirement,
                temperatureRange: newPlant.temperatureRange,
                humidityRange: newPlant.humidityRange,
                soilMoistureThreshold: newPlant.soilMoistureThreshold,
                imageUrl: newPlant.imageUrl,
                location: newPlant.location,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/signup', async (req, res) => {
    const { name, email, password, preferences } = req.body;

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
            preferences: preferences || {},
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
                preferences: newUser.preferences,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/watering-log', async (req, res) => {
    const { plantId, userId, amountMl, method, notes } = req.body;

    try {
        // Validate the plantId and userId (optional, depending on method)
        const plant = await Plant.findById(plantId);
        if (!plant) {
            return res.status(404).json({ message: "Plant not found" });
        }

        let user;
        if (userId) {
            user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        }

        // Create the watering log object
        const wateringLog = new WateringLog({
            plant: plantId,
            user: userId || null, // If AI or automated watering, user will be null
            amountMl: amountMl || null,
            method: method,
            notes: notes || "",
        });

        // Save the new watering log to the database
        await wateringLog.save();

        // Respond with the created watering log
        res.status(201).json({ message: "Watering log created", wateringLog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(5000, () => {
    connectDb();
    console.log("Server started at http://localhost:5000")
})