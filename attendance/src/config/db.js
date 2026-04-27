import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

// Configuramos el pool de conexiones usando las variables del .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,     // En Docker será "db-attendance"
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Verificación de conexión en la consola al iniciar el servicio
pool.on('connect', () => {
  console.log('✅ Microservicio Attendance conectado a su base de datos');
});

// Manejo de errores inesperados en el pool
pool.on('error', (err) => {
  console.error('❌ Error inesperado en el pool de conexiones:', err);
});

export default pool;