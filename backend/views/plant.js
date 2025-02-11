import express from "express";
// Models.
import PlantType from "../models/PlantType.js";
import Plant from "../models/Plant.js";
import User from "../models/User.js";

const router = express.Router();

router.post('/plants', async (req, res) => {
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

export default router;
