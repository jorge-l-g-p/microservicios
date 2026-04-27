import express from "express";
import * as controller from "../controllers/reportes.controller.js";

const router = express.Router();

router.get("/", controller.obtenerReporteGeneral);

export default router;