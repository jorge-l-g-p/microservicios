import { Router } from "express";
import axios from "axios";

const router = Router();
const MS_TAREAS_URL = process.env.URL_TAREAS || "http://ms-tareas:3002";

router.get("/", async (req, res, next) => {
    try {
        const response = await axios.get(`${MS_TAREAS_URL}/`);
        res.status(response.status).json(response.data);
    } catch (error) { next(error); }
});

router.post("/", async (req, res, next) => {
    try {
        const response = await axios.post(`${MS_TAREAS_URL}/`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) { next(error); }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const response = await axios.delete(`${MS_TAREAS_URL}/${req.params.id}`);
        res.status(response.status).json(response.data);
    } catch (error) { next(error); }
});

export default router;