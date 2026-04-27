import * as service from "../services/empleados.service.js";
import axios from "axios";
import { URLS } from "../config/urls.js";

export const getAll = async (req, res) => {
  const data = await service.getEmpleados();
  res.json(data);
};

export const create = async (req, res) => {
  const r = await axios.post(URLS.EMPLEADOS, req.body);
  res.json(r.data);
};

export const update = async (req, res) => {
  const r = await axios.put(`${URLS.EMPLEADOS}/${req.params.id}`, req.body);
  res.json(r.data);
};

export const remove = async (req, res) => {
  const r = await axios.delete(`${URLS.EMPLEADOS}/${req.params.id}`);
  res.json(r.data);
};