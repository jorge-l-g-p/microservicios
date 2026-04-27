import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import empleadosRoutes from './routes/empleados.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas (Nota que aquí es el microservicio, no el gateway, usamos la raíz)
app.use('/', empleadosRoutes);

app.listen(PORT, () => {
    console.log(`👨‍💼 Microservicio de Empleados corriendo en puerto ${PORT}`);
});