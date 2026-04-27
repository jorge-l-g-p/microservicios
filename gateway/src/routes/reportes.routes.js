import { Router } from "express";
import axios from "axios";

const router = Router();
const MS_REPORTES_URL = process.env.URL_REPORTES || "http://ms-reportes:3005";

router.get("/", async (req, res, next) => {
    try {
        const response = await axios.get(`${MS_REPORTES_URL}/`);
        res.status(response.status).json(response.data);
    } catch (error) { next(error); }
});

export default router;