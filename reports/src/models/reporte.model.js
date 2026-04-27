export class ReporteGeneral {
    constructor(id, nombre, cargo, asistencias, ultimoPago, periodo) {
        this.empleadoId = id;
        this.nombre = nombre;
        this.cargo = cargo;
        this.totalAsistencias = asistencias;
        this.ultimoPago = ultimoPago;
        this.periodo = periodo;
    }
}