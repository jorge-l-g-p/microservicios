import axios from "axios";

// 1. Nombre: getAsistencias
export const getAsistencias = async () => {
  try {
    const res = await axios.get("http://localhost:3003/asistencias");
    return res.data || [];
  } catch (error) {
    console.error("Error en getAsistencias:", error.message);
    return [];
  }
};

// 2. Nombre: createAsistencia (Aquí es donde fallaba)


export const createAsistencia = async (datos) => {
    // Si la terminal dice "Asistencia corriendo en 3003", usa 3003 aquí
    const API_URL = "http://localhost:3003/asistencias"; 
    
    try {
        const res = await axios.post(API_URL, datos);
        return res.data;
    } catch (error) {
        // Log para que veas en la terminal del GATEWAY qué pasó exactamente
        console.error("❌ Error conectando al microservicio 3003:", error.message);
        throw error; 
    }
};

// 3. Nombres para update y delete
export const updateAsistencia = async (id, datos) => {
  const res = await axios.put(`http://localhost:3003/asistencias/${id}`, datos);
  return res.data;
};

export const deleteAsistencia = async (id) => {
  const res = await axios.delete(`http://localhost:3003/asistencias/${id}`);
  return res.data;
};