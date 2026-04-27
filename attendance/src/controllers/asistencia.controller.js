import * as AttendanceService from "../services/asistencia.service.js";

// 1. Crear un nuevo registro (Cuando haces clic en "Registrar Asistencia")
export const createRecord = async (req, res) => {
    try {
        // Recibimos los datos del formulario (empleado_id, fecha, entrada, salida, estado)
        const newRecord = await AttendanceService.createAttendance(req.body);
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Obtener todos los registros (Para llenar la tabla de historial)
export const getAllRecords = async (req, res) => {
    try {
        const records = await AttendanceService.getAllAttendance();
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Eliminar un registro (El código que ya tenías)
export const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await AttendanceService.deleteAttendance(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};