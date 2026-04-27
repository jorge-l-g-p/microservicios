import { Router } from "express";
import axios from "axios";

const router = Router();

// La URL del microservicio. 
// En Docker usaremos el nombre del servicio 'ms-empleados', 
// en local puedes usar 'localhost'.
const MS_EMPLEADOS_URL = process.env.URL_EMPLEADOS || "http://ms-empleados:3000";

// 1. OBTENER TODOS LOS EMPLEADOS
router.get("/", async (req, res, next) => {
    try {
        const response = await axios.get(`${MS_EMPLEADOS_URL}/`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error); // Pasa el error al middleware de errores que ya tienes
    }
});

// 2. CREAR UN EMPLEADO
router.post("/", async (req, res, next) => {
    try {
        const response = await axios.post(`${MS_EMPLEADOS_URL}/`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error);
    }
});

// 3. ACTUALIZAR UN EMPLEADO
router.put("/:id", async (req, res, next) => {
    try {
        const response = await axios.put(`${MS_EMPLEADOS_URL}/${req.params.id}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error);
    }
});

// 4. ELIMINAR UN EMPLEADO
router.delete("/:id", async (req, res, next) => {
    try {
        const response = await axios.delete(`${MS_EMPLEADOS_URL}/${req.params.id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        next(error);
    }
});

export default router;