// Formatear moneda para el reporte
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

// Formatear nombres para asegurar que siempre tengan la primera letra en mayúscula
export const capitalizeName = (name) => {
    if (!name) return "N/A";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};