// Datos de ejemplo para los productos
const productos = [
    { id: 1, nombre: 'Guante de Béisbol', precio: 50, imagen: 'https://contents.mediadecathlon.com/p1572172/k$65132809384b3dc676b3a51076206a3f/guante-mano-der-ba150.jpg?format=auto&quality=40&f=452x452' },
    { id: 2, nombre: 'Bate de Béisbol', precio: 40, imagen: 'https://static.wikia.nocookie.net/ficcion-sin-limites/images/a/ad/Bat.png/revision/latest?cb=20210326055538&path-prefix=es' },
    { id: 3, nombre: 'Pelota de Béisbol', precio: 10, imagen: 'https://beisbolmania.mx/cdn/shop/products/PELOTAPROFESIONALDEBEISBOLDEPIELAZTRO_97f00be4-6e92-43fc-a580-1038447b4d3a_1024x1024.jpg?v=1618878110' }
];

// Carrito de compras
let carrito = [];

function generarTarjetas() {
    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        catalogo.appendChild(card);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    const productoExistente = carrito.find(item => item.id === id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const producto = productos.find(item => item.id === id);
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }
    actualizarResumenCompra();
}

// Función para actualizar el resumen de la compra
function actualizarResumenCompra() {
    const listaResumen = document.getElementById('lista-resumen');
    listaResumen.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        const li = document.createElement('li');
        li.innerHTML = `${item.nombre} x ${item.cantidad} = $${subtotal}`;
        listaResumen.appendChild(li);
    });
    document.getElementById('total').textContent = total;
}

// Inicializar la tienda
generarTarjetas();

//Función para finalizar la compra
function finalizarCompra() {
    // Guardar el carrito en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // Redirigir a la página de tickets
    window.location.href = 'tickets.html';
}

// Agregar evento al botón "Finalizar Compra"
document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);


