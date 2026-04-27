import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

// Creamos el pool de conexiones usando las variables del .env de este microservicio
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,      // En Docker será "db-employees"
    database: process.env.DB_NAME,  // En este caso "employees_db"
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

// Mensaje de confirmación para el log de Docker
pool.on('connect', () => {
    console.log('✅ Microservicio de Empleados: Conexión establecida con la DB');
});

export default pool;