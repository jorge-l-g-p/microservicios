import { Router } from "express";
import { getTasks, createTask, deleteTask } from "../controllers/tareas.controller.js";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);

export default router;
