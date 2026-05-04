const API = CONFIG.API_BASE_URL;

let editEmpleadoId = null;
let miGrafico = null;

// Cache global de empleados: { id -> { nombre, cargo } }
let empleadosMap = {};

// ==========================================
// 🔁 NAVEGACIÓN
// ==========================================
function mostrarVista(vista) {
    document.querySelectorAll(".vista").forEach(v => v.classList.add("oculto"));
    const cargadores = {
        empleados:  cargarEmpleados,
        tareas:     cargarTareas,
        asistencia: cargarAsistencias,
        nomina:     cargarNominas,
        reportes:   cargarReportes,
    };
    if (cargadores[vista]) cargadores[vista]();
    const el = document.getElementById(vista);
    if (el) el.classList.remove("oculto");
}

// Helper: resuelve nombre desde el cache
function nombreEmpleado(id) {
    const emp = empleadosMap[Number(id)];
    return emp ? emp.nombre : `Empleado #${id}`;
}

// ==========================================
// 👨‍💼 EMPLEADOS
// ==========================================
async function cargarEmpleados() {
    try {
        const res = await fetch(`${API}/empleados`);
        if (!res.ok) throw new Error("Error en empleados");
        const data = await res.json();

        // Actualizar cache global
        empleadosMap = {};
        data.forEach(e => { empleadosMap[e.id] = e; });

        // Tabla de gestión
        const lista = document.getElementById("listaEmpleados");
        if (lista) {
            lista.innerHTML = data.map(e => `
                <tr>
                    <td><strong>${e.nombre}</strong></td>
                    <td>${e.cargo}</td>
                    <td>
                        <button class="btn-edit" onclick="prepararEdicionEmpleado(${e.id}, '${e.nombre}', '${e.cargo}')">✏️ Editar</button>
                        <button class="btn-del" onclick="eliminarEmpleado(${e.id})">🗑️ Eliminar</button>
                    </td>
                </tr>
            `).join('');
        }
        // Sincronizar todos los selects
        ["empleadoSelect", "asistenciaEmpleadoSelect", "payrollEmpleadoSelect"].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.innerHTML = '<option value="">-- Seleccionar empleado --</option>' +
                    data.map(e => `<option value="${e.id}">${e.nombre} (${e.cargo})</option>`).join('');
            }
        });
    } catch (e) {
        console.error("Error cargando empleados:", e);
    }
}

async function guardarEmpleado() {
    const nombre = document.getElementById("nombre").value.trim();
    const cargo  = document.getElementById("cargo").value.trim();
    if (!nombre || !cargo) return alert("Nombre y cargo son obligatorios");

    const method = editEmpleadoId ? "PUT" : "POST";
    const url = editEmpleadoId
        ? `${API}/empleados/${editEmpleadoId}`
        : `${API}/empleados`;

    try {
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, cargo }),
        });
        editEmpleadoId = null;
        document.getElementById("nombre").value = "";
        document.getElementById("cargo").value  = "";
        document.getElementById("btnGuardarEmpleado").textContent = "Guardar Empleado";
        cargarEmpleados();
    } catch (e) {
        alert("Error al conectar con el servidor");
    }
}

function prepararEdicionEmpleado(id, nombre, cargo) {
    document.getElementById("nombre").value = nombre;
    document.getElementById("cargo").value  = cargo;
    editEmpleadoId = id;
    document.getElementById("btnGuardarEmpleado").textContent = "💾 Actualizar Empleado";
    window.scrollTo(0, 0);
}

async function eliminarEmpleado(id) {
    if (!confirm(`¿Eliminar a "${nombreEmpleado(id)}"? Esto podría afectar nóminas y tareas vinculadas.`)) return;
    await fetch(`${API}/empleados/${id}`, { method: "DELETE" });
    cargarEmpleados();
}

// ==========================================
// 📋 TAREAS
// ==========================================
async function cargarTareas() {
    await cargarEmpleados();
    try {
        const res  = await fetch(`${API}/tareas`);
        const data = await res.json();
        const tbody = document.getElementById("listaTareas");
        if (tbody) {
            tbody.innerHTML = data.length
                ? data.map(t => `
                    <tr>
                        <td><strong>${t.titulo}</strong></td>
                        <td>${t.descripcion || "-"}</td>
                        <td><span class="badge">👤 ${nombreEmpleado(t.empleado_id)}</span></td>
                        <td><button class="btn-del" onclick="eliminarTarea(${t.id})">🗑️</button></td>
                    </tr>
                `).join('')
                : '<tr><td colspan="4" style="color:#64748b;padding:14px">No hay tareas registradas</td></tr>';
        }
    } catch (e) {
        console.error("MS Tareas offline:", e);
    }
}

async function crearTarea() {
    const titulo      = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const empleado_id = document.getElementById("empleadoSelect").value;

    if (!titulo || !empleado_id) return alert("Título y empleado son obligatorios");

    await fetch(`${API}/tareas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descripcion, empleado_id }),
    });
    document.getElementById("titulo").value      = "";
    document.getElementById("descripcion").value = "";
    cargarTareas();
}

async function eliminarTarea(id) {
    if (!confirm("¿Eliminar tarea?")) return;
    await fetch(`${API}/tareas/${id}`, { method: "DELETE" });
    cargarTareas();
}

// ==========================================
// 🕒 ASISTENCIA
// ==========================================
async function cargarAsistencias() {
    await cargarEmpleados();
    try {
        const res  = await fetch(`${API}/asistencias`);
        const data = await res.json();
        const tbody = document.getElementById("tablaAsistenciasBody");
        if (!tbody) return;

        const estadoColor = { Presente: "#48bb78", Tarde: "#ed8936", Ausente: "#fc8181", Permiso: "#76e4f7" };

        tbody.innerHTML = data.length
            ? data.map(a => `
                <tr>
                    <td><strong>${nombreEmpleado(a.empleado_id)}</strong></td>
                    <td>${empleadosMap[Number(a.empleado_id)]?.cargo || "-"}</td>
                    <td>${a.fecha}</td>
                    <td>${a.hora_entrada}</td>
                    <td>${a.hora_salida || "-"}</td>
                    <td><span style="color:${estadoColor[a.estado] || 'white'};font-weight:bold">${a.estado}</span></td>
                    <td><button class="btn-del" onclick="eliminarAsistencia(${a.id})">🗑️</button></td>
                </tr>
            `).join('')
            : '<tr><td colspan="7">No hay registros</td></tr>';
    } catch (e) {
        console.error("MS Asistencia offline:", e);
    }
}

async function guardarAsistencia() {
    const empleado_id  = document.getElementById("asistenciaEmpleadoSelect").value;
    const fecha        = document.getElementById("fechaAsistencia").value;
    const hora_entrada = document.getElementById("horaEntrada").value;
    const hora_salida  = document.getElementById("horaSalida").value;
    const estado       = document.getElementById("estadoAsistencia").value;

    if (!empleado_id || !fecha || !hora_entrada || !estado)
        return alert("Empleado, fecha, hora de entrada y estado son obligatorios");

    try {
        const res = await fetch(`${API}/asistencias`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ empleado_id, fecha, hora_entrada, hora_salida, estado }),
        });
        if (res.ok) {
            cargarAsistencias();
        } else {
            const err = await res.json();
            alert("Error: " + (err.error || "desconocido"));
        }
    } catch (e) {
        alert("Error al conectar con el servidor");
    }
}

async function eliminarAsistencia(id) {
    if (!confirm("¿Eliminar registro?")) return;
    await fetch(`${API}/asistencias/${id}`, { method: "DELETE" });
    cargarAsistencias();
}

// ==========================================
// 💰 NÓMINA
// ==========================================
async function cargarNominas() {
    await cargarEmpleados();
    try {
        const res  = await fetch(`${API}/nominas`);
        const data = await res.json();
        const tbody = document.getElementById("payrollBody");
        if (!tbody) return;

        tbody.innerHTML = data.length
            ? data.map(n => `
                <tr>
                    <td><strong>${nombreEmpleado(n.empleado_id)}</strong></td>
                    <td>${empleadosMap[Number(n.empleado_id)]?.cargo || "-"}</td>
                    <td>${n.mes} ${n.anio}</td>
                    <td>$${parseFloat(n.salario_base).toFixed(2)}</td>
                    <td>$${parseFloat(n.bonos_extra).toFixed(2)}</td>
                    <td style="color:#fc8181">-$${parseFloat(n.deducciones).toFixed(2)}</td>
                    <td style="font-weight:bold;color:#48bb78">$${parseFloat(n.total_neto).toFixed(2)}</td>
                    <td><button class="btn-del" onclick="eliminarNomina(${n.id})">🗑️</button></td>
                </tr>
            `).join('')
            : '<tr><td colspan="8">No hay nóminas registradas</td></tr>';
    } catch (e) {
        console.error("MS Nómina offline:", e);
    }
}

async function guardarNomina() {
    const empleado_id = parseInt(document.getElementById("payrollEmpleadoSelect").value);
    const salarioBase = parseFloat(document.getElementById("salarioBase").value);
    const bonosExtra  = parseFloat(document.getElementById("bonosExtra").value) || 0;
    const mes         = document.getElementById("mesNomina").value;
    const año         = parseInt(document.getElementById("añoNomina").value);

    if (!empleado_id || isNaN(salarioBase)) return alert("Empleado y salario base son obligatorios");

    try {
        const res = await fetch(`${API}/nominas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ empleado_id, salarioBase, bonosExtra, mes, año }),
        });
        if (res.ok) {
            cargarNominas();
        } else {
            const err = await res.json();
            alert("Error: " + (err.error || "desconocido"));
        }
    } catch (e) {
        alert("Error al conectar con el servidor");
    }
}

async function eliminarNomina(id) {
    if (!confirm("¿Eliminar nómina?")) return;
    await fetch(`${API}/nominas/${id}`, { method: "DELETE" });
    cargarNominas();
}

// ==========================================
// 📊 REPORTES
// ==========================================
async function cargarReportes() {
    try {
        const res  = await fetch(`${API}/reportes`);
        const data = await res.json();

        const body = document.getElementById("reportesBody");
        if (body) {
            body.innerHTML = data.tabla && data.tabla.length
                ? data.tabla.map(f => `
                    <tr>
                        <td><strong>${f.nombre}</strong></td>
                        <td>${f.cargo}</td>
                        <td style="text-align:center">${f.dias}</td>
                        <td style="text-align:right;color:#48bb78;font-weight:bold">$${f.total.toLocaleString()}</td>
                    </tr>
                `).join('')
                : '<tr><td colspan="4">Sin datos — registra asistencias y nóminas primero</td></tr>';
        }

        const totalNomina = document.getElementById("totalNomina");
        const avgAsist    = document.getElementById("avgAsistencia");
        const totalEmp    = document.getElementById("totalEmpCard");

        if (totalNomina) totalNomina.innerText = `$${(data.metricas?.gastoTotal || 0).toLocaleString()}`;
        if (avgAsist)    avgAsist.innerText    = `${data.metricas?.promedioAsistencia || 0}%`;
        if (totalEmp)    totalEmp.innerText    = data.metricas?.totalEmpleados || 0;

        if (data.tabla && data.tabla.length > 0) renderizarGrafico(data.tabla);
    } catch (e) {
        console.error("MS Reportes offline:", e);
    }
}

function renderizarGrafico(datos) {
    const ctx = document.getElementById("graficoNominas")?.getContext("2d");
    if (!ctx) return;
    if (miGrafico) miGrafico.destroy();

    miGrafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: datos.map(d => d.nombre),
            datasets: [{
                label: "Sueldo Neto ($)",
                data: datos.map(d => d.total),
                backgroundColor: "#3498db",
                borderRadius: 6,
            }],
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: "white" } } },
            scales: {
                x: { ticks: { color: "white" } },
                y: { ticks: { color: "white" } },
            },
        },
    });
}

function exportarExcel() {
    const rows = document.querySelectorAll("#reportesBody tr");
    if (!rows.length) return alert("No hay datos para exportar");

    let csv = "\uFEFF" + "Empleado,Cargo,Dias Asistidos,Total Pagado\n";
    rows.forEach(row => {
        const cols = Array.from(row.querySelectorAll("td")).map(td => {
            const val = td.innerText.replace(/"/g, '""');
            return val.includes(",") ? `"${val}"` : val;
        });
        csv += cols.join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = "reporte_nomina.csv";
    a.click();
    URL.revokeObjectURL(url);
}

// ==========================================
// 🚀 INICIO
// ==========================================
window.onload = () => {
    mostrarVista("empleados");
};
