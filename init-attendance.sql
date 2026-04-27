CREATE TABLE IF NOT EXISTS asistencias (
    id SERIAL PRIMARY KEY,
    empleado_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora_entrada TIME NOT NULL,
    hora_salida TIME,
    estado VARCHAR(20) NOT NULL,
    CONSTRAINT chk_estado CHECK (estado IN ('Presente','Tarde','Ausente','Permiso')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
