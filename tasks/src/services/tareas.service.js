import pool from "../config/db.js";

export const getAllTasks = async () => {
    const { rows } = await pool.query("SELECT * FROM tareas ORDER BY id DESC");
    return rows;
};

export const createNewTask = async (titulo, descripcion, empleado_id) => {
    const { rows } = await pool.query(
        "INSERT INTO tareas (titulo, descripcion, empleado_id) VALUES ($1, $2, $3) RETURNING *",
        [titulo, descripcion, empleado_id]
    );
    return rows[0];
};

export const deleteTask = async (id) => {
    await pool.query("DELETE FROM tareas WHERE id = $1", [id]);
    return { message: "Tarea eliminada" };
};