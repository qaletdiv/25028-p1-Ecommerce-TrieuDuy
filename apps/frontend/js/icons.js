// Shop by Icons Functions

let currentIconIndex = 0;
const iconsPerView = 5;

// Get products by icon filter
function getProductsByIcon(iconFilter) {
    return products.filter(product => {
        const productName = product.name.toLowerCase();
        const filterLower = iconFilter.toLowerCase();
        
        // Check if product name contains the filter text
        if (iconFilter === 'Air Jordan 1') {
            return productName.includes('air jordan 1') || productName.includes('jordan 1');
        } else if (iconFilter === 'Air Force 1') {
            return productName.includes('air force 1') || productName.includes('force 1');
        } else if (iconFilter === 'Air Max') {
            return productName.includes('air max');
        } else {
            return productName.includes(filterLower);
        }
    });
}

// Initialize shop by icons
function initShopByIcons() {
    const carousel = document.getElementById('iconsCarousel');
    const indicator = document.getElementById('iconsIndicator');
    
    if (!carousel || !indicator) return;
    
    // Render icons with product count
    carousel.innerHTML = shoeIcons.map((icon, index) => {
        const iconProducts = getProductsByIcon(icon.filter);
        return `
            <div class="icon-card" onclick="filterByIcon('${icon.filter}')">
                <div class="icon-image-container">
                    <img src="${icon.image}" alt="${icon.name}" onerror="this.src='${FALLBACK_IMAGE}'">
                </div>
                <div class="icon-name">${icon.name}</div>
                <div class="icon-product-count">${iconProducts.length} sản phẩm</div>
            </div>
        `;
    }).join('');
    
    // Render indicator
    const totalPages = Math.ceil(shoeIcons.length / iconsPerView);
    indicator.innerHTML = `${currentIconIndex + 1}/${totalPages}`;
    
    // Show first set of icons
    updateIconsDisplay();
}

// Update icons display
function updateIconsDisplay() {
    const carousel = document.getElementById('iconsCarousel');
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.icon-card');
    const startIndex = currentIconIndex * iconsPerView;
    const endIndex = startIndex + iconsPerView;
    
    cards.forEach((card, index) => {
        if (index >= startIndex && index < endIndex) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update indicator
    const indicator = document.getElementById('iconsIndicator');
    if (indicator) {
        const totalPages = Math.ceil(shoeIcons.length / iconsPerView);
        indicator.textContent = `${currentIconIndex + 1}/${totalPages}`;
    }
}

// Scroll icons carousel
function scrollIconsCarousel(direction) {
    const totalPages = Math.ceil(shoeIcons.length / iconsPerView);
    const newIndex = currentIconIndex + direction;
    
    if (newIndex >= 0 && newIndex < totalPages) {
        currentIconIndex = newIndex;
        updateIconsDisplay();
    }
}

// Filter products by icon
function filterByIcon(filterText) {
    // Show products page
    showProductsPage(null);
    
    // Set search input to filter text
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = filterText;
    }
    
    // Trigger filter
    setTimeout(() => {
        filterAndSortProducts();
    }, 100);
}

