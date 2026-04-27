-- Crear tabla de asistencias basada en el frontend
CREATE TABLE IF NOT EXISTS asistencias (
    id SERIAL PRIMARY KEY,
    empleado_id INT NOT NULL,           -- Viene del selector "Empleado"
    fecha DATE NOT NULL,               -- Campo "Fecha"
    hora_entrada TIME NOT NULL,        -- Campo "Hora Entrada"
    hora_salida TIME,                  -- Campo "Hora Salida" (opcional al inicio)
    estado VARCHAR(20) NOT NULL,       -- Campo "Estado"
    
    -- Restricción para asegurar que el estado sea válido
    CONSTRAINT chk_estado CHECK (estado IN ('Presente', 'Tarde', 'Ausente', 'Permiso')),
    
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de prueba para ver el historial de inmediato
INSERT INTO asistencias (empleado_id, fecha, hora_entrada, hora_salida, estado) 
VALUES (1, '2026-04-21', '08:00:00', '17:00:00', 'Presente');