import express from "express";
import cors from "cors";
import axios from "axios";
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const SERVICES = {
  empleados:  process.env.URL_EMPLEADOS  || "http://employees:3000",
  tareas:     process.env.URL_TAREAS     || "http://tasks:3002",
  asistencias: process.env.URL_ASISTENCIAS || "http://attendance:3003",
  nominas:    process.env.URL_NOMINAS    || "http://payroll:3004",
  reportes:   process.env.URL_REPORTES   || "http://reports:3007",
};

// Proxy universal: /api/:service/...resto -> microservicio correspondiente
app.all("/api/:service*", async (req, res) => {
  const { service } = req.params;
  const targetBase = SERVICES[service];

  if (!targetBase) {
    return res.status(404).json({ error: `Servicio '${service}' no configurado` });
  }

  // Reconstruir el path después del nombre del servicio
  const subPath = req.originalUrl.replace(`/api/${service}`, "") || "/";

  try {
    console.log(`→ ${req.method} /api/${service}${subPath} → ${targetBase}${subPath}`);

    const response = await axios({
      method: req.method,
      url: `${targetBase}${subPath}`,
      data: req.body,
      params: req.query,
      headers: { "Content-Type": "application/json" },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(`Error en gateway [${service}]:`, error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(503).json({ error: `Microservicio '${service}' no disponible` });
    }
  }
});

app.listen(4000, () => {
  console.log("🚀 Gateway corriendo en puerto 4000");
});
