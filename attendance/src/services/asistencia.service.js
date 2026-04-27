import pool from "../config/db.js";

// Para guardar lo que viene del formulario de "Registrar Nueva Asistencia"
export const createAttendance = async (data) => {
    const { empleado_id, fecha, hora_entrada, hora_salida, estado } = data;
    const { rows } = await pool.query(
        `INSERT INTO asistencias (empleado_id, fecha, hora_entrada, hora_salida, estado) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [empleado_id, fecha, hora_entrada, hora_salida, estado]
    );
    return rows[0];
};

// Para el "Historial de Registros"
export const getAllAttendance = async () => {
    const { rows } = await pool.query(
        "SELECT * FROM asistencias ORDER BY fecha DESC, hora_entrada DESC"
    );
    return rows;
};

// Por si necesitas buscar las asistencias de un empleado específico
export const getByEmployee = async (empleado_id) => {
    const { rows } = await pool.query(
        "SELECT * FROM asistencias WHERE empleado_id = $1 ORDER BY fecha DESC",
        [empleado_id]
    );
    return rows;
};

export const deleteAttendance = async (id) => {
    const result = await pool.query("DELETE FROM asistencias WHERE id = $1", [id]);
    if (result.rowCount === 0) {
        throw new Error("El registro no existe");
    }
    return { message: "Registro eliminado con éxito" };
};