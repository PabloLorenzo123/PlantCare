import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Link to the user who owns the plant
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  plantType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlantType',
    required: true, // Link to the PlantType model
  },
  lightRequirement: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: function () {
      return this.plantType.lightRequirement; // Default to PlantType's value
    },
  },
  temperatureRange: {
    min: {
      type: Number,
      default: function () {
        return this.plantType.temperatureRange.min; // Default to PlantType's value
      },
    },
    max: {
      type: Number,
      default: function () {
        return this.plantType.temperatureRange.max; // Default to PlantType's value
      },
    },
  },
  humidityRange: {
    min: {
      type: Number,
      default: function () {
        return this.plantType.humidityRange.min; // Default to PlantType's value
      },
    },
    max: {
      type: Number,
      default: function () {
        return this.plantType.humidityRange.max; // Default to PlantType's value
      },
    },
  },
  soilMoistureThreshold: {
    type: Number,
    default: function () {
      return this.plantType.soilMoistureThreshold; // Default to PlantType's value
    },
  },
  lastWatered: {
    type: Date,
    required: false, // Optional, the last time the plant was watered
  },
  nextWateringDate: {
    type: Date,
    required: false, // AI-generated date for next watering
  },
  imageUrl: {
    type: String,
    required: false, // Optional, image URL of the plant
  },
  location: {
    type: String,
    required: false, // Optional, location where the plant is kept (e.g., "Living Room")
  },
}, { timestamps: true });

export default mongoose.model('Plant', plantSchema);
