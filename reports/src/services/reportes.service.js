import axios from 'axios';

const EMPLOYEES_URL = process.env.EMPLOYEES_SERVICE_URL || "http://employees:3000";
const ATTENDANCE_URL = process.env.ATTENDANCE_SERVICE_URL || "http://attendance:3003";
const PAYROLL_URL    = process.env.PAYROLL_SERVICE_URL    || "http://payroll:3004";

export const generarConsolidado = async () => {
    // Traemos datos de los 3 microservicios en paralelo
    const [empRes, attRes, payRes] = await Promise.allSettled([
        axios.get(`${EMPLOYEES_URL}/`),
        axios.get(`${ATTENDANCE_URL}/`),
        axios.get(`${PAYROLL_URL}/`),
    ]);

    const empleados  = empRes.status  === "fulfilled" ? empRes.value.data  : [];
    const asistencias = attRes.status === "fulfilled" ? attRes.value.data  : [];
    const nominas    = payRes.status  === "fulfilled" ? payRes.value.data  : [];

    // Gasto total de nómina
    const gastoTotal = nominas.reduce((sum, n) => sum + parseFloat(n.total_neto || 0), 0);

    // Promedio de asistencia
    const presentes = asistencias.filter(a => a.estado === "Presente").length;
    const promedioAsistencia = asistencias.length > 0
        ? ((presentes / asistencias.length) * 100).toFixed(1)
        : 0;

    // Tabla consolidada por empleado
    const tabla = empleados.map(emp => {
        const dias = asistencias.filter(
            a => Number(a.empleado_id) === Number(emp.id) && a.estado === "Presente"
        ).length;

        const pagos = nominas.filter(n => Number(n.empleado_id) === Number(emp.id));
        const total = pagos.reduce((sum, p) => sum + parseFloat(p.total_neto || 0), 0);

        return {
            nombre: emp.nombre,
            cargo: emp.cargo,
            dias,
            total: parseFloat(total.toFixed(2)),
        };
    });

    return {
        tabla,
        metricas: {
            gastoTotal: parseFloat(gastoTotal.toFixed(2)),
            promedioAsistencia: parseFloat(promedioAsistencia),
            totalEmpleados: empleados.length,
        },
    };
};
