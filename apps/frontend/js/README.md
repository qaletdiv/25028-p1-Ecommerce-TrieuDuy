# Cấu trúc JavaScript Files

## Tổ chức code theo module

### 1. Data Files
- **products-data.js**: Chứa dữ liệu sản phẩm và icons (products array, shoeIcons array)

### 2. Utility Files
- **utils.js**: Các hàm tiện ích (formatPrice, getProductById, pagination state)

### 3. Core Features
- **cart.js**: Quản lý giỏ hàng
- **favorites.js**: Quản lý sản phẩm yêu thích

### 4. Products Module
- **products-render.js**: Render sản phẩm (renderProductCard, renderProducts, initFeaturedProducts, initLatestProducts, initSuggestedProducts, initRotationProducts)
- **products-filter.js**: Filter, sort và pagination (filterAndSortProducts, clearFilters, renderPagination, changePage)
- **products-modal.js**: Modal chi tiết sản phẩm (showProductModal, selectSize, addToCartFromModal, toggleFavoriteFromModal, toggleAccordion)

### 5. UI Components
- **carousel.js**: Hero carousel (initCarousel, startCarousel, stopCarousel, goToSlide, changeSlide)
- **icons.js**: Shop by icons (initShopByIcons, getProductsByIcon, scrollIconsCarousel, filterByIcon)
- **promo-banners.js**: Promotional banners (initPromoBanners)

### 6. Navigation
- **navigation.js**: Điều hướng giữa các trang (showHomePage, showProductsPage, showSupportPage, performHeroSearch)

### 7. Authentication
- **auth.js**: Xác thực người dùng (switchAuthTab, handleLogin, handleRegister)

### 8. Main
- **main.js**: Khởi tạo ứng dụng và setup event listeners (DOMContentLoaded, setupEventListeners, setupModalClose, closeModal, toggleFaq)

## Thứ tự load trong index.html

1. products-data.js (dữ liệu)
2. utils.js (tiện ích)
3. cart.js, favorites.js (core features)
4. products-render.js, products-filter.js, products-modal.js (products module)
5. carousel.js, icons.js, promo-banners.js (UI components)
6. navigation.js (navigation)
7. auth.js (authentication)
8. main.js (main initialization)

## Lợi ích của cấu trúc này

- **Dễ bảo trì**: Mỗi file có trách nhiệm rõ ràng
- **Dễ mở rộng**: Thêm tính năng mới không ảnh hưởng code cũ
- **Dễ debug**: Tìm lỗi nhanh hơn khi code được tổ chức tốt
- **Dễ làm việc nhóm**: Nhiều người có thể làm việc trên các file khác nhau


