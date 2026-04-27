import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import tasksRoutes from './routes/tareas.routes.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/', tasksRoutes);

app.listen(PORT, () => {
    console.log(`✅ Microservicio Tasks corriendo en puerto ${PORT}`);
});
