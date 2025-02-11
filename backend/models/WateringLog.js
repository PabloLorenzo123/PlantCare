import mongoose from "mongoose";

const wateringLogSchema = new mongoose.Schema({
    plant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false, // Nullable if AI or automated watering
    },
    wateredAt: {
        type: Date,
        default: Date.now,
    },
    amountMl: {
        type: Number,
        required: false, // Optional, for tracking precise water amount
    },
    method: {
        type: String,
        enum: ["Manual", "AI-Predicted", "Scheduled"],
        required: true,
    },
    notes: {
        type: String,
        required: false, // Optional, for user comments
    },
}, { timestamps: true });

export default mongoose.model("WateringLog", wateringLogSchema);
