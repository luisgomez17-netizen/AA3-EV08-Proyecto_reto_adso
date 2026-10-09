function cargarProductos() {
    const contenedor = document.getElementById("lista-productos");
    if (!contenedor) return;

    // Verificar si existe el arreglo 'productos' en datos.js
    if (typeof productos !== "undefined" && productos.length > 0) {
        contenedor.innerHTML = "";
        productos.forEach(p => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${p.id}</td>
                <td><a href="detalle.html?id=${p.id}">${p.nombre}</a></td>
                <td>${formatoPrecio(p.precio)}</td>
                <td>${p.cantidad}</td>
                <td><span class="badge">${p.estado}</span></td>
                <td>
                    <a href="detalle.html?id=${p.id}" class="btn btn-sm">Ver</a>
                </td>
            `;
            contenedor.appendChild(fila);
        });
    } else {
        contenedor.innerHTML = `<tr><td colspan="6" style="text-align:center;">No hay productos registrados.</td></tr>`;
    }
}

function iniciarDetalle() {
    const dNombre = document.getElementById("d-nombre");
    const dPrecio = document.getElementById("d-precio");
    const dCantidad = document.getElementById("d-cantidad");
    const dEstado = document.getElementById("d-estado");
    const dCategoria = document.getElementById("d-categoria");
    const mensaje = document.getElementById("mensaje-vacio");
    const panel = document.getElementById("panel-detalle");

    // Obtener el ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    let prodEncontrado = null;
    if (typeof productos !== "undefined" && idParam) {
        prodEncontrado = productos.find(p => p.id == idParam);
    } else if (typeof producto !== "undefined") {
        prodEncontrado = producto;
    }

    if (prodEncontrado) {
        if (dNombre) dNombre.textContent = prodEncontrado.nombre || "Sin nombre";
        if (dPrecio) dPrecio.textContent = formatoPrecio(prodEncontrado.precio);
        if (dCantidad) dCantidad.textContent = prodEncontrado.cantidad;
        if (dEstado) dEstado.textContent = prodEncontrado.estado;
        if (dCategoria) dCategoria.textContent = prodEncontrado.categoria || "N/A";

        if (mensaje) mensaje.hidden = true;
        if (panel) panel.hidden = false;
    } else {
        if (mensaje) mensaje.hidden = false;
        if (panel) panel.hidden = true;
    }
}

function iniciarRegistro() {
    const boton = document.getElementById("btn-guardar");
    if (!boton) return;

    boton.addEventListener("click", function () {
        const inputNombre = document.getElementById("nombreProducto");
        const inputPrecio = document.getElementById("precioProducto");
        const inputCantidad = document.getElementById("cantidadProducto");

        const nombre = inputNombre ? inputNombre.value.trim() : "";
        const precio = inputPrecio ? inputPrecio.value.trim() : "";
        const cantidad = inputCantidad ? inputCantidad.value.trim() : "";

        if (nombre === "" || precio === "" || cantidad === "") {
            alert("Completa los campos obligatorios.");
            return;
        }

        alert("Producto registrado correctamente.");
    });
}

function formatoPrecio(valor) {
    return "$" + Number(valor || 0).toLocaleString("es-CO");
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("lista-productos")) {
        cargarProductos();
    }
    if (document.getElementById("detalle-producto")) {
        iniciarDetalle();
    }
    if (document.getElementById("btn-guardar")) {
        iniciarRegistro();
    }
});