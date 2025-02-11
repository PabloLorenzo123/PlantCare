import express from "express";
import dotenv from "dotenv";


import { connectDb } from "./config/db.js";
// Views.
import userRoutes from './views/user.js';
import plantRoutes from "./views/plant.js";
import wateringRoutes from "./views/wateringLog.js";


dotenv.config();

// JWT Secret Key (store this in a .env file for security)
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const app = express();
app.use(express.json()) // Middleware that allows to accept JSON data in the request body.

app.use("/api/auth", userRoutes);
app.use("/api/plants/", plantRoutes);
app.use("/api/watering/", wateringRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(5000, () => {
    connectDb();
    console.log("Server started at http://localhost:5000")
})