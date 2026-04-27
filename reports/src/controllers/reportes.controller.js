import * as service from "../services/reportes.service.js";

export const obtenerReporteGeneral = async (req, res, next) => {
    try {
        const data = await service.generarConsolidado();
        res.json(data);
    } catch (error) {
        next(error);
    }
};