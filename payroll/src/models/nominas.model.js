export class Nominas {
    constructor(id, empleadoId, mes, año, salarioBase, bonos, deducciones, total) {
        this.id = id;
        this.empleadoId = empleadoId;
        this.mes = mes;
        this.año = año;
        this.salarioBase = salarioBase;
        this.bonos = bonos;
        this.deducciones = deducciones;
        this.total = total;
        this.fechaGenerada = new Date().toISOString();
    }
}
export const nominas = [];