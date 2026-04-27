import axios from "axios";
import { URLS } from "../config/urls.js";

export const getTareas = async () => {
  const tareas = (await axios.get(URLS.TAREAS)).data;
  const empleados = (await axios.get(URLS.EMPLEADOS)).data;

  return tareas.map(t => {
    const emp = empleados.find(e => e.id == t.empleadoId);

    return {
      ...t,
      empleadoNombre: emp ? emp.nombre : "No asignado"
    };
  });
};