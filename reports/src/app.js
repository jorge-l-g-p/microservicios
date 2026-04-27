import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportesRoutes from "./routes/reportes.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/", reportesRoutes);

// Middleware de errores
app.use(errorMiddleware);

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`📊 Servicio de Reportes activo en puerto ${PORT}`);
});