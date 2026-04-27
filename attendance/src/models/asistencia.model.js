export class Asistencia {
  constructor(id, empleadoId, tareaId, horaEntrada, horaSalida, estado) {
    this.id = id;
    this.empleadoId = empleadoId;
    this.tareaId = tareaId;
    this.horaEntrada = horaEntrada;
    this.horaSalida = horaSalida;
    this.estado = estado;
  }
}