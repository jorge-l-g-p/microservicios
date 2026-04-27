import { Router } from "express";
import axios from "axios";

const router = Router();
const MS_NOMINAS_URL = process.env.URL_NOMINAS || "http://ms-nominas:3004";

router.get("/", async (req, res, next) => {
    try {
        const response = await axios.get(`${MS_NOMINAS_URL}/`);
        res.status(response.status).json(response.data);
    } catch (error) { next(error); }
});

router.post("/", async (req, res, next) => {
    try {
        const response = await axios.post(`${MS_NOMINAS_URL}/`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) { next(error); }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const response = await axios.delete(`${MS_NOMINAS_URL}/${req.params.id}`);
        res.status(response.status).json(response.data);
    } catch (error) { next(error); }
});

export default router;