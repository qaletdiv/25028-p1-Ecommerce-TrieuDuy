/**
 * Script để fetch dữ liệu sản phẩm từ API miễn phí
 * Chạy trong browser console hoặc Node.js
 */

// Fetch từ Fake Store API
async function fetchFakeStoreProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        
        // Chuyển đổi format cho phù hợp
        const convertedProducts = products.map((product, index) => ({
            id: index + 100, // Bắt đầu từ 100 để tránh trùng
            name: product.title,
            category: mapCategory(product.category),
            description: product.description,
            price: Math.round(product.price * 25000), // Chuyển USD sang VNĐ (tỷ giá ước tính)
            rating: product.rating.rate,
            featured: false,
            createdAt: new Date().toISOString().split('T')[0],
            image: product.image
        }));
        
        console.log('Products:', convertedProducts);
        return convertedProducts;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Map category từ API sang category của bạn
function mapCategory(apiCategory) {
    const categoryMap = {
        "men's clothing": "Áo",
        "women's clothing": "Áo",
        "electronics": "Phụ kiện",
        "jewelery": "Phụ kiện"
    };
    return categoryMap[apiCategory] || "Khác";
}

// Fetch từ DummyJSON
async function fetchDummyJSONProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data = await response.json();
        
        const convertedProducts = data.products.map((product, index) => ({
            id: index + 200, // Bắt đầu từ 200
            name: product.title,
            category: mapDummyCategory(product.category),
            description: product.description,
            price: Math.round(product.price * 25000), // Chuyển USD sang VNĐ
            rating: product.rating,
            featured: false,
            createdAt: new Date().toISOString().split('T')[0],
            image: product.images[0] || product.thumbnail
        }));
        
        console.log('Products:', convertedProducts);
        return convertedProducts;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function mapDummyCategory(category) {
    const categoryMap = {
        "mens-shirts": "Áo",
        "womens-dresses": "Áo",
        "womens-shoes": "Giày",
        "mens-shoes": "Giày",
        "sunglasses": "Phụ kiện",
        "handbags": "Túi",
        "womens-bags": "Túi",
        "mens-watches": "Phụ kiện"
    };
    
    // Tìm category phù hợp
    for (const [key, value] of Object.entries(categoryMap)) {
        if (category.toLowerCase().includes(key)) {
            return value;
        }
    }
    
    return "Khác";
}

// Export để dùng trong browser console
if (typeof window !== 'undefined') {
    window.fetchFakeStoreProducts = fetchFakeStoreProducts;
    window.fetchDummyJSONProducts = fetchDummyJSONProducts;
}

// Hướng dẫn sử dụng:
// 1. Mở browser console (F12)
// 2. Load file này hoặc copy code vào console
// 3. Chạy: fetchDummyJSONProducts() hoặc fetchFakeStoreProducts()
// 4. Copy kết quả JSON và paste vào products-data.js








