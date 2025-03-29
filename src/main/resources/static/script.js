const API_URL = "http://localhost:8080/api/carrito";

// Obtener el carrito del backend
async function obtenerCarrito() {
    const res = await fetch(API_URL);
    return await res.json();
}

// Agregar producto al carrito
async function agregarAlCarrito(nombre, precio) {
    const producto = { nombre, precio, cantidad: 1 };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    });

    actualizarCarrito();
}

// Mostrar el carrito en el modal
async function verCarrito() {
    const modal = document.getElementById("modal-carrito");
    const contenidoCarrito = document.getElementById("contenido-carrito");
    contenidoCarrito.innerHTML = "";

    const carrito = await obtenerCarrito();

    if (carrito.length === 0) {
        contenidoCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        carrito.forEach(p => {
            contenidoCarrito.innerHTML += `
                <div class="item-carrito">
                    <span>${p.cantidad} x ${p.nombre} (€${p.precio})</span>
                    <button onclick="eliminarDelCarrito(${p.id})">Eliminar</button>
                </div>
            `;
        });

        contenidoCarrito.innerHTML += `
            <button onclick="finalizarCompra()">Comprar Ahora</button>
        `;
    }

    modal.style.display = "block";
}

// Eliminar producto del carrito
async function eliminarDelCarrito(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    actualizarCarrito();
    verCarrito();
}

// Vaciar todo el carrito
async function vaciarCarrito() {
    const carrito = await obtenerCarrito();
    for (const p of carrito) {
        await eliminarDelCarrito(p.id);
    }
    verCarrito();
}

// Actualizar el número del icono del carrito
async function actualizarCarrito() {
    const carrito = await obtenerCarrito();
    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    document.getElementById("contador-carrito").innerText = totalItems;
}

// Finalizar la compra → mostrar resumen en compra.html
function finalizarCompra() {
    window.location.href = "compra.html";
}

// En compra.html: cargar resumen y formulario
async function cargarCompra() {
    const carrito = await obtenerCarrito();

    if (carrito.length === 0) {
        alert("No hay productos en el carrito. Redirigiendo a la tienda...");
        window.location.href = "index.html";
        return;
    }

    const resumenCarrito = document.getElementById("resumen-carrito");
    carrito.forEach(p => {
        const item = document.createElement("p");
        item.textContent = `${p.cantidad} x ${p.nombre} (€${p.precio})`;
        resumenCarrito.appendChild(item);
    });

    document.getElementById("formulario-compra").addEventListener("submit", async function (event) {
        event.preventDefault();
        alert("Compra realizada con éxito. ¡Gracias por tu compra!");

        // Vaciar el carrito después de la compra
        for (const p of carrito) {
            await eliminarDelCarrito(p.id);
        }

        window.location.href = "index.html";
    });
}

// Al cargar la página
window.onload = async function () {
    await actualizarCarrito();

    if (window.location.pathname.includes("compra.html")) {
        await cargarCompra();
    }
};
