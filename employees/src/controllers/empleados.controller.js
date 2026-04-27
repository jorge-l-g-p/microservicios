import * as EmployeeService from "../services/empleados.service.js";

export const createEmployee = async (req, res) => {
    const { nombre, cargo } = req.body; // Coincide con tus inputs
    try {
        const nuevo = await EmployeeService.create(nombre, cargo);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEmployees = async (req, res) => {
    try {
        const todos = await EmployeeService.getAll();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { nombre, cargo } = req.body;
    try {
        const actualizado = await EmployeeService.update(id, nombre, cargo);
        if (!actualizado) return res.status(404).json({ error: "Empleado no encontrado" });
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        await EmployeeService.remove(id);
        res.json({ message: "Empleado eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};