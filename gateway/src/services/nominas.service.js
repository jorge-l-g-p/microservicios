import axios from "axios";

// Apuntamos al puerto 3004 que acabas de activar
const API_URL = "http://localhost:3004/nominas";

export const getPayroll = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const createPayroll = async (data) => {
    const res = await axios.post(API_URL, data);
    return res.data;
};