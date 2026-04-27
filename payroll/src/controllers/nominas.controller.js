import * as nominasService from "../services/nominas.service.js";

export const create = async (req, res) => {
    try {
        const nuevaNomina = await nominasService.create(req.body);
        res.status(201).json(nuevaNomina);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAll = async (req, res) => {
    try {
        const lista = await nominasService.getAll();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        await nominasService.remove(req.params.id);
        res.json({ message: "Nómina eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
