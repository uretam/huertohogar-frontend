// Arreglo base de productos de HuertoHogar
const products = [
    {
        id: 1,
        name: "Manzanas Orgánicas",
        category: "frutas",
        price: 2500,
        image: "https://placehold.co/400x300/2E8B57/FFFFFF?text=Manzanas",
        description: "Manzanas rojas crujientes y libres de pesticidas por kilo."
    },
    {
        id: 2,
        name: "Tomates Limachinos",
        category: "verduras",
        price: 1800,
        image: "https://placehold.co/400x300/2E8B57/FFFFFF?text=Tomates",
        description: "Tomates de sabor intenso cultivados localmente por kilo."
    },
    {
        id: 3,
        name: "Miel Orgánica Natural",
        category: "despensa",
        price: 5500,
        image: "https://placehold.co/400x300/8B4513/FFFFFF?text=Miel+Organica",
        description: "Miel 100% pura de floración nativa, frasco de 500g."
    },
    {
        id: 4,
        name: "Espinaca Fresca",
        category: "verduras",
        price: 1200,
        image: "https://placehold.co/400x300/2E8B57/FFFFFF?text=Espinaca",
        description: "Manojo de espinaca recién cosechada, rica en hierro."
    },
    {
        id: 5,
        name: "Naranjas de Cítrico",
        category: "frutas",
        price: 2200,
        image: "https://placehold.co/400x300/FFD700/333333?text=Naranjas",
        description: "Jugosas naranjas de estación por kilo."
    },
    {
        id: 6,
        name: "Aceite de Oliva Extra Virgen",
        category: "despensa",
        price: 7900,
        image: "https://placehold.co/400x300/8B4513/FFFFFF?text=Aceite+Oliva",
        description: "Prensado en frío, botella de cristal de 1 Litro."
    }
];

// Generar el HTML de una tarjeta de producto
function createProductCard(product) {
    return `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toLocaleString('es-CL')}</p>
            <p>${product.description}</p>
            <button class="btn-primary" onclick="addToCart(${product.id})">Añadir al Carrito</button>
        </article>
    `;
}

// Renderizar catálogo o productos destacados
document.addEventListener('DOMContentLoaded', () => {
    const featuredContainer = document.getElementById('featured-products-container');
    const catalogContainer = document.getElementById('catalog-products-container');

    if (featuredContainer) {
        featuredContainer.innerHTML = products.slice(0, 3).map(createProductCard).join('');
    }

    if (catalogContainer) {
        renderCatalog(products);
        setupFilterButtons();
    }
});

function renderCatalog(productList) {
    const catalogContainer = document.getElementById('catalog-products-container');
    if (catalogContainer) {
        catalogContainer.innerHTML = productList.map(createProductCard).join('');
    }
}

// Filtros por categoría
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