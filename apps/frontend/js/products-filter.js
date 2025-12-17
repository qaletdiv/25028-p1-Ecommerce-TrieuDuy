// Products Filter and Sort Functions

// Filter and sort products
function filterAndSortProducts() {
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const sortFilter = document.getElementById('sortFilter')?.value || 'default';
    const searchInput = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const minPrice = parseInt(document.getElementById('minPriceFilter')?.value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPriceFilter')?.value) || 10000000;
    const minRating = parseFloat(document.getElementById('minRatingFilter')?.value) || 0;
    
    let filtered = products.filter(product => {
        const matchCategory = !categoryFilter || product.category === categoryFilter;
        const matchSearch = !searchInput || 
            product.name.toLowerCase().includes(searchInput) ||
            product.description.toLowerCase().includes(searchInput);
        const matchPrice = product.price >= minPrice && product.price <= maxPrice;
        const matchRating = product.rating >= minRating;
        return matchCategory && matchSearch && matchPrice && matchRating;
    });
    
    // Sort products
    switch(sortFilter) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'rating-desc':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Keep original order
            break;
    }
    
    // Update product count
    updateProductCount(filtered.length);
    
    // Pagination
    currentPage = 1;
    renderProductsWithPagination(filtered);
}

// Update product count display
function updateProductCount(count) {
    const productCountEl = document.getElementById('productCount');
    if (productCountEl) {
        productCountEl.textContent = `${count} sản phẩm phù hợp`;
    }
}

// Clear all filters
function clearFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('minPriceFilter').value = '0';
    document.getElementById('maxPriceFilter').value = '10000000';
    document.getElementById('minRatingFilter').value = '0';
    document.getElementById('sortFilter').value = 'default';
    document.getElementById('searchInput').value = '';
    filterAndSortProducts();
}

// Render products with pagination
function renderProductsWithPagination(filteredProducts) {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Update product count
    updateProductCount(filteredProducts.length);
    
    renderProducts(paginatedProducts, 'productsGrid');
    renderPagination(totalPages);
}

// Render pagination
function renderPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Trước</button>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span class="pagination-dots">...</span>`;
        }
    }
    
    // Next button
    paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Sau</button>`;
    
    paginationContainer.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const sortFilter = document.getElementById('sortFilter')?.value || 'default';
    const searchInput = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const minPrice = parseInt(document.getElementById('minPriceFilter')?.value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPriceFilter')?.value) || 10000000;
    const minRating = parseFloat(document.getElementById('minRatingFilter')?.value) || 0;
    
    let filtered = products.filter(product => {
        const matchCategory = !categoryFilter || product.category === categoryFilter;
        const matchSearch = !searchInput || 
            product.name.toLowerCase().includes(searchInput) ||
            product.description.toLowerCase().includes(searchInput);
        const matchPrice = product.price >= minPrice && product.price <= maxPrice;
        const matchRating = product.rating >= minRating;
        return matchCategory && matchSearch && matchPrice && matchRating;
    });
    
    // Sort products
    switch(sortFilter) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'rating-desc':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filtered.slice(startIndex, endIndex);
    
    // Update product count
    updateProductCount(filtered.length);
    
    renderProducts(paginatedProducts, 'productsGrid');
    renderPagination(totalPages);
    
    // Scroll to top of products section
    document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
}


