// Products Rendering Functions

// Render product card
function renderProductCard(product) {
    const isFavorite = favoritesManager.isFavorite(product.id);
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">
                <button class="favorite-icon ${isFavorite ? 'active' : ''}" 
                        onclick="event.stopPropagation(); favoritesManager.toggleFavorite(${product.id})">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <span class="product-rating">${product.rating}★</span>
                </div>
                <div class="product-actions">
                    <button class="btn-view" onclick="event.stopPropagation(); showProductModal(${product.id})">Chi tiết</button>
                    <button class="btn-add-cart" onclick="event.stopPropagation(); showProductModal(${product.id})">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
    `;
}

// Render products grid
function renderProducts(productsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = productsToRender.map(product => renderProductCard(product)).join('');
    
    // Add click event to product cards
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            showProductModal(productId);
        });
    });
}

// Initialize featured products
function initFeaturedProducts() {
    const featured = products.filter(p => p.featured);
    renderProducts(featured, 'featuredGrid');
}

// Initialize featured products full width (3 products + 1 signature card)
function initFeaturedProductsFullWidth() {
    const featured = products.filter(p => p.featured).slice(0, 3);
    const container = document.getElementById('featuredProductsFull');
    if (!container) return;
    
    let html = featured.map((product, index) => `
        <div class="featured-product-card" onclick="showProductsPage(event)" style="background-image: url('${product.image}');">
            <div class="featured-product-overlay">
                <div class="featured-product-content">
                    <div class="featured-product-category">${product.category}</div>
                    <h3 class="featured-product-name">${product.name}</h3>
                    <p class="featured-product-description">${product.description}</p>
                    <div class="featured-product-price">${formatPrice(product.price)}</div>
                    <button class="btn-featured" onclick="event.stopPropagation(); showProductsPage(event)">Khám phá</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add signature card as 4th card
    html += `
        <div class="featured-product-card featured-signature-card" onclick="showProductsPage(event)">
            <div class="signature-card-content">
                <h2 class="signature-card-title">Ecommerce</h2>
                <p class="signature-card-subtitle">Nơi hội tụ của phong cách và chất lượng</p>
                <p class="signature-card-text">Khám phá thế giới thời trang thể thao với những sản phẩm được tuyển chọn kỹ lưỡng</p>
                <button class="btn-featured" onclick="event.stopPropagation(); showProductsPage(event)">Xem tất cả</button>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Initialize rotation products (10 products)
function initRotationProducts() {
    const rotationContainer = document.getElementById('rotationProducts');
    if (!rotationContainer) return;
    
    // Get 10 random products
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const rotationProducts = shuffled.slice(0, 10);
    
    rotationContainer.innerHTML = rotationProducts.map(product => `
        <div class="rotation-product-card" onclick="showProductModal(${product.id})">
            <div class="rotation-product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">
            </div>
            <div class="rotation-product-info">
                <div class="rotation-product-category">${product.category}</div>
                <h3 class="rotation-product-name">${product.name}</h3>
                <div class="rotation-product-price">${formatPrice(product.price)}</div>
            </div>
        </div>
    `).join('');
}

// Initialize rotation products (10 products)
function initRotationProducts() {
    const rotationContainer = document.getElementById('rotationProducts');
    if (!rotationContainer) return;
    
    // Get 10 random products
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const rotationProducts = shuffled.slice(0, 10);
    
    rotationContainer.innerHTML = rotationProducts.map(product => `
        <div class="rotation-product-card" onclick="showProductModal(${product.id})">
            <div class="rotation-product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">
            </div>
            <div class="rotation-product-info">
                <div class="rotation-product-category">${product.category}</div>
                <h3 class="rotation-product-name">${product.name}</h3>
                <div class="rotation-product-price">${formatPrice(product.price)}</div>
            </div>
        </div>
    `).join('');
}

// Scroll rotation products
function scrollRotationProducts(direction) {
    const container = document.querySelector('.rotation-products-container');
    if (!container) return;
    
    const scrollAmount = 400; // Width of one product card + gap
    const currentScroll = container.scrollLeft;
    const newScroll = currentScroll + (scrollAmount * direction);
    
    container.scrollTo({
        left: newScroll,
        behavior: 'smooth'
    });
}

// Initialize latest products
function initLatestProducts() {
    const latest = [...products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);
    renderProducts(latest, 'latestGrid');
}

// Initialize suggested products (random 4 products)
function initSuggestedProducts() {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const suggested = shuffled.slice(0, 4);
    renderProducts(suggested, 'suggestedGrid');
}

