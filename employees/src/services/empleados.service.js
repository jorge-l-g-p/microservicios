import pool from "../config/db.js";

export const create = async (nombre, cargo) => {
    const { rows } = await pool.query(
        // Cambiamos 'nombre_completo' por 'nombre'
        "INSERT INTO empleados (nombre, cargo) VALUES ($1, $2) RETURNING *",
        [nombre, cargo]
    );
    return rows[0];
};

export const getAll = async () => {
    const { rows } = await pool.query("SELECT * FROM empleados");
    return rows;
};

export const update = async (id, nombre, cargo) => {
    const { rows } = await pool.query(
        "UPDATE empleados SET nombre = $1, cargo = $2 WHERE id = $3 RETURNING *",
        [nombre, cargo, id]
    );
    return rows[0];
};

export const remove = async (id) => {
    await pool.query("DELETE FROM empleados WHERE id = $1", [id]);
    return { message: "Empleado eliminado" };
};