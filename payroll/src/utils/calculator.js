export const calcularTotales = (base, bonos) => {
    const deduccion = base * 0.10; // 10% de deducción fija
    const total = (base + bonos) - deduccion;
    
    return {
        deduccion: parseFloat(deduccion.toFixed(2)),
        total: parseFloat(total.toFixed(2))
    };
};