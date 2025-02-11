import mongoose from "mongoose";

const plantTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensuring no two types with the same name
  },
  species: {
    type: String,
    required: true,
  },
  lightRequirement: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium', // Default to medium light
  },
  temperatureRange: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  humidityRange: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  soilMoistureThreshold: {
    type: Number,
    default: 40, // Default to 40% moisture threshold
  },
}, { timestamps: true });

export default mongoose.model('PlantType', plantTypeSchema);
