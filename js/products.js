// Arreglo base de productos de HuertoHogar
const products = [
    {
        id: 1,
        name: "Manzanas Orgánicas",
        category: "frutas",
        price: 2500,
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
        description: "Manzanas rojas crujientes y libres de pesticidas por kilo."
    },
    {
        id: 2,
        name: "Tomates Limachinos",
        category: "verduras",
        price: 1800,
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
        description: "Tomates de sabor intenso cultivados localmente por kilo."
    },
    {
        id: 3,
        name: "Miel Orgánica Natural",
        category: "despensa",
        price: 5500,
        image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=400",
        description: "Miel 100% pura de floración nativa, frasco de 500g."
    },
    {
        id: 4,
        name: "Espinaca Fresca",
        category: "verduras",
        price: 1200,
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
        description: "Manojo de espinaca recién cosechada, rica en hierro."
    },
    {
        id: 5,
        name: "Naranjas de Cítrico",
        category: "frutas",
        price: 2200,
        image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400",
        description: "Jugosas naranjas de estación por kilo."
    },
    {
        id: 6,
        name: "Aceite de Oliva Extra Virgen",
        category: "despensa",
        price: 7900,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
        description: "Prensado en frío, botella de cristal de 1 Litro."
    }
];

// Devuelve un producto según su id (usado en detalle-producto.html)
function getProductById(id) {
    return products.find(p => p.id === Number(id));
}

// Función para generar el HTML de una tarjeta de producto
function createProductCard(product) {
    return `
        <article class="product-card">
            <a href="detalle-producto.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
            </a>
            <p class="price">$${product.price.toLocaleString('es-CL')}</p>
            <p>${product.description}</p>
            <button class="btn-primary" onclick="addToCart(${product.id})">Añadir al Carrito</button>
        </article>
    `;
}

// Renderizar catálogo o productos destacados al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    const featuredContainer = document.getElementById('featured-products-container');
    const catalogContainer = document.getElementById('catalog-products-container');

    // Cargar destacados (primeros 3) en index.html
    if (featuredContainer) {
        featuredContainer.innerHTML = products.slice(0, 3).map(createProductCard).join('');
    }

    // Cargar todos los productos en productos.html
    if (catalogContainer) {
        renderCatalog(products);
        setupFilterButtons();
    }
});

function renderCatalog(productList) {
    const catalogContainer = document.getElementById('catalog-products-container');
    if (catalogContainer) {
        catalogContainer.innerHTML = productList.length
            ? productList.map(createProductCard).join('')
            : '<p>No hay productos en esta categoría.</p>';
    }
}

// Lógica de botones de filtro por categoría
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const category = e.target.dataset.category;
            if (category === 'all') {
                renderCatalog(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                renderCatalog(filtered);
            }
        });
    });
}
