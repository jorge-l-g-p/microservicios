export const errorHandler = (err, req, res, next) => {
    console.error(`[Error Gateway]: ${err.message}`);

    // Si el error viene de Axios (el microservicio respondió con error)
    if (err.response) {
        return res.status(err.response.status).json(err.response.data);
    }

    // Si el microservicio ni siquiera respondió (está apagado)
    res.status(500).json({
        error: "Error de comunicación con el servicio interno",
        detalle: err.message
    });
};