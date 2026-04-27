import pool from "../config/db.js";

export const create = async (datos) => {
    const { empleado_id, salarioBase, bonosExtra, mes, año } = datos;
    
    // Cálculo basado en tu tabla: Deducción del 10% del salario base
    const deducciones = salarioBase * 0.10;
    const totalNeto = (parseFloat(salarioBase) + parseFloat(bonosExtra)) - deducciones;

    const { rows } = await pool.query(
        `INSERT INTO nominas 
        (empleado_id, mes, anio, salario_base, bonos_extra, deducciones, total_neto) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [empleado_id, mes, año, salarioBase, bonosExtra, deducciones, totalNeto]
    );
    return rows[0];
};

export const getAll = async () => {
    const { rows } = await pool.query("SELECT * FROM nominas ORDER BY id DESC");
    return rows;
};

export const remove = async (id) => {
    await pool.query("DELETE FROM nominas WHERE id = $1", [id]);
    return { message: "Nómina eliminada" };
};