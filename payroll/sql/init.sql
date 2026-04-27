CREATE TABLE IF NOT EXISTS nominas (
    id SERIAL PRIMARY KEY,
    empleado_id INTEGER NOT NULL,
    mes VARCHAR(20) NOT NULL,
    anio INTEGER NOT NULL,
    salario_base DECIMAL(10, 2) NOT NULL,
    bonos_extra DECIMAL(10, 2) DEFAULT 0,
    deducciones DECIMAL(10, 2) NOT NULL, -- Aquí guardaremos el 10%
    total_neto DECIMAL(10, 2) NOT NULL,   -- Resultado final
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);