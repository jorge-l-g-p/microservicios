import axios from "axios";
import { URLS } from "../config/urls.js";

export const getEmpleados = async () => {
  const res = await axios.get(URLS.EMPLEADOS);
  return res.data;
};