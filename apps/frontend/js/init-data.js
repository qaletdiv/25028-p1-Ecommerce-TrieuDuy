// Data Initialization - Khởi tạo dữ liệu từ mock-data.js vào localStorage

/**
 * Kiểm tra và khởi tạo dữ liệu vào localStorage
 * Nếu localStorage chưa có dữ liệu, sẽ copy từ mock-data.js
 */
function initializeData() {
    // Khởi tạo Products
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(MOCK_PRODUCTS));
        console.log('✓ Đã khởi tạo products từ mock-data.js');
    }
    
    // Khởi tạo Shoe Icons
    if (!localStorage.getItem('shoeIcons')) {
        localStorage.setItem('shoeIcons', JSON.stringify(MOCK_SHOE_ICONS));
        console.log('✓ Đã khởi tạo shoeIcons từ mock-data.js');
    }
    
    // Khởi tạo Users (mảng rỗng nếu chưa có)
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
        console.log('✓ Đã khởi tạo users (mảng rỗng)');
    }
    
    // Khởi tạo Orders (mảng rỗng nếu chưa có)
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
        console.log('✓ Đã khởi tạo orders (mảng rỗng)');
    }
    
    // Khởi tạo Cart (mảng rỗng nếu chưa có)
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
        console.log('✓ Đã khởi tạo cart (mảng rỗng)');
    }
    
    // Khởi tạo Favorites (mảng rỗng nếu chưa có)
    if (!localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', JSON.stringify([]));
        console.log('✓ Đã khởi tạo favorites (mảng rỗng)');
    }
}

// Gọi hàm khởi tạo ngay khi file được load
initializeData();


