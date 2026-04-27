import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

// Configuración de conexión para el Microservicio de Nómina (Payroll)
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,      // En Docker: "db-payroll"
    database: process.env.DB_NAME,  // En Docker: "payroll_db"
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

// Evento para verificar la conexión en la consola de Docker
pool.on('connect', () => {
    console.log('💰 Microservicio de Payroll: Conexión exitosa con PostgreSQL');
});

export default pool;