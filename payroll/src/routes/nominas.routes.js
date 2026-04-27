import express from "express";
import * as controller from "../controllers/nominas.controller.js";

const router = express.Router();

router.get("/", controller.getAll);
router.post("/", controller.create);
router.delete("/:id", controller.remove);

export default router;
