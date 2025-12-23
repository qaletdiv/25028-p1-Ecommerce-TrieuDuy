// Utility Functions

// Format price to Vietnamese Dong
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
}

// Get product by ID
function getProductById(id) {
    return products.find(p => p.id === id);
}

// Pagination state
let currentPage = 1;
const itemsPerPage = 6;

// Local fallback image (data URI) - transparent placeholder without text
const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%25" height="100%25" fill="%23f5f5f5"/></svg>';

