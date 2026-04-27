import { pool } from "../config/db.js";
import * as TaskService from "../services/tareas.service.js";

// En tu controlador de tareas
export const getTasks = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tareas");
        
        // Si no hay errores, devolvemos las filas (aunque sea un [] vacío)
        res.json(result.rows); 
    } catch (error) {
    // 🚩 CAMBIA ESTO para ver si el error es de conexión o de la tabla
    console.error("❌ ERROR TÉCNICO:", error); 
    res.status(500).json({ error: error.message });
}
};

export const createTask = async (req, res) => {
    const { titulo, descripcion, empleado_id } = req.body;
    try {
        const newTask = await TaskService.createNewTask(titulo, descripcion, empleado_id);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const result = await TaskService.deleteTask(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};