export const errorMiddleware = (err, req, res, next) => {
    console.error("❌ Payroll Service Error:", err.message);
    res.status(500).json({ error: "Error interno en el servicio de Nómina" });
};