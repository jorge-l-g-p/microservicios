import axios from "axios";

// Apuntamos al puerto donde corre tu nuevo microservicio
const API_URL = "http://localhost:3005/reportes";

export const getReporteGeneral = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};