// Products Data - Đọc từ localStorage
// Lưu ý: Dữ liệu sẽ được khởi tạo từ mock-data.js vào localStorage nếu chưa có
// File này đọc dữ liệu từ localStorage để sử dụng trong ứng dụng

let products = [];

// Load products từ localStorage
function loadProducts() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    } else {
        // Nếu chưa có trong localStorage, dùng từ mock-data (fallback)
        products = typeof MOCK_PRODUCTS !== 'undefined' ? [...MOCK_PRODUCTS] : [];
    }
}

// Gọi hàm load ngay khi file được load
loadProducts();

// Export để các file khác có thể reload products sau khi thay đổi
function reloadProducts() {
    loadProducts();
}

// Save products vào localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Shop by Icons data - Đọc từ localStorage
let shoeIcons = [];

// Load shoeIcons từ localStorage
function loadShoeIcons() {
    const savedIcons = localStorage.getItem('shoeIcons');
    if (savedIcons) {
        shoeIcons = JSON.parse(savedIcons);
    } else {
        // Nếu chưa có trong localStorage, dùng từ mock-data (fallback)
        shoeIcons = typeof MOCK_SHOE_ICONS !== 'undefined' ? [...MOCK_SHOE_ICONS] : [];
    }
}

// Gọi hàm load ngay khi file được load
loadShoeIcons();

// Save shoeIcons vào localStorage
function saveShoeIcons() {
    localStorage.setItem('shoeIcons', JSON.stringify(shoeIcons));
}
