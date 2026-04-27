import express from "express";
import cors from "cors";
import "dotenv/config";
import nominasRoutes from "./routes/nominas.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// Ruta principal del servicio
app.use("/", nominasRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`💰 Servicio de Nómina (Payroll) activo en puerto ${PORT}`);
});