import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());


const swaggerDocument = YAML.load("./openapi.yaml"); 


app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);


app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);


// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Iniciar conexión a BD
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Swagger disponible en http://localhost:${PORT}/docs`);
  });
}).catch((error) => {
  console.error("Error al conectar a MongoDB:", error);
  process.exit(1);
});