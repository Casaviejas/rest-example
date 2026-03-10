import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from '../src/config/db';
//import authRoutes from "./routes/auth";
//import profileRoutes from "./routes/profile";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

//app.use("/auth", authRoutes);
//app.use("/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

connectDB();