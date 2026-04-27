import express from "express";
import cors from "cors";
import asistenciaRoutes from "./routes/asistencia.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", asistenciaRoutes);

app.listen(3003, () => {
  console.log("🕒 Asistencia corriendo en 3003");
});