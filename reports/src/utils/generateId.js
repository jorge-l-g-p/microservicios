// Generador de IDs simple para consistencia entre microservicios
export const generateId = (dataArray) => {
    if (!dataArray || dataArray.length === 0) return 1;
    const ids = dataArray.map(item => item.id);
    return Math.max(...ids) + 1;
};