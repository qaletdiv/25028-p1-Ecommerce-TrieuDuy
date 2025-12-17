# E-commerce Project - Trieu Duy

Dự án website thương mại điện tử được phát triển bằng HTML, CSS và JavaScript thuần.

## 📁 Cấu trúc Dự án

```
ecommerce-project/
├── apps/
│   └── frontend/
│       ├── index.html          # Trang chủ chính
│       ├── css/
│       │   └── style.css       # Toàn bộ styling
│       └── js/
│           ├── main.js         # Entry point
│           ├── products-data.js    # Dữ liệu sản phẩm
│           ├── products-render.js  # Render sản phẩm
│           ├── products-filter.js  # Filter & Pagination
│           ├── products-modal.js   # Modal chi tiết sản phẩm
│           ├── cart.js         # Quản lý giỏ hàng
│           ├── favorites.js    # Sản phẩm yêu thích
│           ├── auth.js         # Đăng nhập/Đăng ký
│           ├── orders.js       # Quản lý đơn hàng
│           ├── navigation.js   # Điều hướng trang
│           ├── carousel.js     # Carousel hero banner
│           ├── icons.js        # Shop by icons
│           ├── promo-banners.js # Banner khuyến mãi
│           └── utils.js        # Utility functions
└── README.md
```

## 🌿 Cấu trúc Nhánh Git

Dự án được chia thành các nhánh theo chức năng để dễ quản lý:

### Nhánh Chính
- **`main`** - Nhánh chính chứa toàn bộ code hoàn chỉnh

### Nhánh Feature (Theo Chức Năng)

1. **`feature/homepage-duy`**
   - Trang chủ với hero carousel
   - Featured products (4 khung sản phẩm nổi bật)
   - Signature section
   - Sneaker rotation section
   - Shop by icons section
   - Promotional banners

2. **`feature/products-filter-duy`**
   - Trang danh sách sản phẩm
   - Filter bar (danh mục, giá, đánh giá)
   - Sort dropdown
   - Pagination
   - Product count display

3. **`feature/cart-favorites-duy`**
   - Giỏ hàng (thêm/xóa/cập nhật số lượng)
   - Sản phẩm yêu thích
   - Cart modal
   - Favorites modal

4. **`feature/auth-duy-new`**
   - Đăng nhập
   - Đăng ký
   - Quản lý session
   - User dropdown menu

5. **`feature/checkout-orders-duy`**
   - Trang thanh toán
   - Form nhập thông tin giao hàng
   - Tóm tắt đơn hàng
   - Xác nhận đơn hàng
   - Quản lý đơn hàng

6. **`feature/user-account-duy`**
   - Trang tài khoản người dùng
   - Hiển thị đơn hàng
   - Hủy đơn hàng (đơn đang xử lý)
   - User dropdown với các tùy chọn

7. **`feature/support-duy`**
   - Trang hỗ trợ
   - FAQ (Accordion)
   - Thông tin liên hệ
   - Các chủ đề trợ giúp

## 🚀 Cách Chạy Dự án

### Cách 1: Sử dụng Python HTTP Server
```bash
cd apps/frontend
python -m http.server 8000
```
Truy cập: `http://localhost:8000`

### Cách 2: Sử dụng Node.js http-server
```bash
cd apps/frontend
npx http-server -p 8000
```

### Cách 3: Sử dụng VS Code Live Server
- Cài extension "Live Server"
- Click chuột phải vào `index.html` → "Open with Live Server"

## 📤 Push Code lên GitHub

Xem file `PUSH_TO_GITHUB.md` để biết hướng dẫn chi tiết.

Hoặc chạy script:
- **Windows**: `push-all-branches.bat`
- **Linux/Mac**: `bash push-all-branches.sh`

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

## 📝 Ghi Chú

- Tất cả dữ liệu được lưu trong Local Storage
- Không có backend, chỉ frontend thuần
- Tất cả text đều bằng tiếng Việt
