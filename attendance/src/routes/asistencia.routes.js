import { Router } from "express";
import { createRecord, getAllRecords, deleteRecord } from "../controllers/asistencia.controller.js";

const router = Router();

router.post("/", createRecord);
router.get("/", getAllRecords);
router.delete("/:id", deleteRecord);

export default router;
