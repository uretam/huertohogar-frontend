// Obtener carrito desde localStorage o inicializarlo vacío
function getCart() {
    return JSON.parse(localStorage.getItem('huerto_cart')) || [];
}

// Guardar carrito en localStorage y actualizar la vista
function saveCart(cart) {
    localStorage.setItem('huerto_cart', JSON.stringify(cart));
    updateCartBadge();
}

// Agregar un producto al carrito
function addToCart(productId, quantity = 1) {
    quantity = Number(quantity);
    if (!Number.isFinite(quantity) || quantity < 1) quantity = 1;

    const cart = getCart();
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    saveCart(cart);
    alert(`¡${product.name} añadido al carrito!`);
}

// Cambiar la cantidad de un producto
function updateQuantity(productId, amount) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);

    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        saveCart(cart);
        renderCartPage();
    }
}

// Actualizar el contador rojo del encabezado
function updateCartBadge() {
    const cart = getCart();
    const countSpan = document.getElementById('cart-count');
    if (countSpan) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countSpan.textContent = totalItems;
    }
}

// Renderizar detalle completo en carrito.html
function renderCartPage() {
    const cartTableContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total-price');
    if (!cartTableContainer) return;

    const cart = getCart();
    if (cart.length === 0) {
        cartTableContainer.innerHTML = '<p>El carrito está vacío.</p>';
        if (cartTotalElement) cartTotalElement.textContent = '$0';
        return;
    }

    let total = 0;
    let html = `
        <table class="cart-table" style="width:100%; text-align:left; border-collapse:collapse;">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        html += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toLocaleString('es-CL')}</td>
                <td>
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span> ${item.quantity} </span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </td>
                <td>$${subtotal.toLocaleString('es-CL')}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    cartTableContainer.innerHTML = html;
    if (cartTotalElement) cartTotalElement.textContent = `$${total.toLocaleString('es-CL')}`;
}

// Procesar el pago (botón "Proceder al Pago" en carrito.html)
function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    // Requiere que el usuario haya iniciado sesión (ver js/auth.js)
    if (typeof getCurrentUser === 'function' && !getCurrentUser()) {
        alert('Debes iniciar sesión para completar tu compra.');
        window.location.href = 'login.html';
        return;
    }

    alert('¡Compra realizada con éxito! Gracias por tu pedido.');
    saveCart([]);
    renderCartPage();
}

// Inicializar el badge al cargar cualquier página
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    renderCartPage();
});