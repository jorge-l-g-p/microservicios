// Configuración global para conectar el Frontend con el API Gateway
const CONFIG = {
    // URL de tu Gateway (Puerto 4000 según tu diagrama)
    // Usamos localhost porque el navegador del cliente accede desde fuera del contenedor
    API_BASE_URL: 'http://localhost:4000/api',

    // Rutas de los Microservicios a través del Gateway
    // Esto permite que el Gateway redirija la petición al servicio correcto
    ENDPOINTS: {
        EMPLEADOS: '/empleados',
        TAREAS: '/tareas',
        ASISTENCIA: '/asistencia',
        NOMINA: '/nomina',
        INFORMES: '/informes'
    }
};

// Evitar que el objeto sea modificado accidentalmente
Object.freeze(CONFIG);