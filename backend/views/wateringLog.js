import express from "express";

import WateringLog from "../models/WateringLog.js";
import Plant from "../models/Plant.js";

const router = express.Router();

router.post('/watering-log', async (req, res) => {
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

export default router;
