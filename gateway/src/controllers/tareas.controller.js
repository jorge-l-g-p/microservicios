import * as service from "../services/tareas.service.js";
import axios from "axios";
import { URLS } from "../config/urls.js";

export const getAll = async (req, res) => {
  const data = await service.getTareas();
  res.json(data);
};

export const create = async (req, res) => {
  const r = await axios.post(URLS.TAREAS, req.body);
  res.json(r.data);
};

export const update = async (req, res) => {
  const r = await axios.put(`${URLS.TAREAS}/${req.params.id}`, req.body);
  res.json(r.data);
};

export const remove = async (req, res) => {
  const r = await axios.delete(`${URLS.TAREAS}/${req.params.id}`);
  res.json(r.data);
};