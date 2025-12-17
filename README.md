# E-commerce Project - Trieu Duy

Dự án website thương mại điện tử được phát triển bằng HTML, CSS và JavaScript thuần.

## 📁 Cấu trúc Dự án

```
ecommerce-project/
└── apps/
    └── frontend/
        ├── index.html          # Trang chủ chính
        ├── css/
        │   └── style.css       # Toàn bộ styling
        └── js/
            ├── main.js         # Entry point
            ├── products-data.js    # Dữ liệu sản phẩm
            ├── products-render.js  # Render sản phẩm
            ├── products-filter.js  # Filter & Pagination
            ├── products-modal.js   # Modal chi tiết sản phẩm
            ├── cart.js         # Quản lý giỏ hàng
            ├── favorites.js    # Sản phẩm yêu thích
            ├── auth.js         # Đăng nhập/Đăng ký
            ├── orders.js       # Quản lý đơn hàng
            ├── navigation.js   # Điều hướng trang
            ├── carousel.js     # Carousel hero banner
            ├── icons.js        # Shop by icons
            ├── promo-banners.js # Banner khuyến mãi
            └── utils.js        # Utility functions
```

## 🌿 Cấu trúc Nhánh Git

- **`main`** - Nhánh chính
- **`feature/homepage-duy`** - Trang chủ
- **`feature/products-filter-duy`** - Sản phẩm & Filter
- **`feature/cart-favorites-duy`** - Giỏ hàng & Yêu thích
- **`feature/auth-duy-new`** - Đăng nhập/Đăng ký
- **`feature/checkout-orders-duy`** - Thanh toán & Đơn hàng
- **`feature/user-account-duy`** - Tài khoản người dùng
- **`feature/support-duy`** - Hỗ trợ

## 🚀 Cách Chạy Dự án

```bash
cd apps/frontend
python -m http.server 8000
```
Truy cập: `http://localhost:8000`

## ✨ Tính Năng Chính

- ✅ Trang chủ động với carousel và featured products
- ✅ Danh sách sản phẩm với filter và pagination
- ✅ Chi tiết sản phẩm với nhiều hình ảnh
- ✅ Giỏ hàng và yêu thích
- ✅ Đăng nhập/Đăng ký
- ✅ Thanh toán và xác nhận đơn hàng
- ✅ Quản lý tài khoản và đơn hàng
- ✅ Hủy đơn hàng với lý do
- ✅ Trang hỗ trợ với FAQ
- ✅ Responsive design
- ✅ User dropdown menu

## 🛠️ Công Nghệ Sử Dụng

- **HTML5** - Cấu trúc trang
- **CSS3** - Styling và responsive
- **Vanilla JavaScript** - Logic và tương tác
- **Local Storage** - Lưu trữ dữ liệu local

## 👤 Tác Giả

**Trieu Duy** - Đồ án E-commerce Frontend
