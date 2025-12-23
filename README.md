# ShopStyle - Hệ Thống Ecommerce

Hệ thống thương mại điện tử được xây dựng bằng **HTML, CSS và JavaScript thuần**, không sử dụng framework. Dữ liệu được quản lý thông qua `localStorage` và `mock-data.js`.

## 🚀 Tính Năng

### Người Dùng
- ✅ **Đăng ký/Đăng nhập** - Quản lý tài khoản người dùng
- ✅ **Duyệt sản phẩm** - Xem danh sách sản phẩm với bộ lọc và sắp xếp
- ✅ **Tìm kiếm sản phẩm** - Tìm kiếm theo tên, với lịch sử tìm kiếm (5 mục gần nhất)
- ✅ **Chi tiết sản phẩm** - Modal hiển thị thông tin chi tiết, hình ảnh, kích thước
- ✅ **Giỏ hàng** - Thêm/xóa sản phẩm, cập nhật số lượng
- ✅ **Yêu thích** - Lưu sản phẩm yêu thích
- ✅ **Đặt hàng** - Quy trình checkout với địa chỉ giao hàng
- ✅ **Quản lý địa chỉ** - Lưu nhiều địa chỉ, đặt địa chỉ mặc định
- ✅ **Lịch sử đơn hàng** - Xem và hủy đơn hàng
- ✅ **Trang tài khoản** - Xem và chỉnh sửa thông tin cá nhân

### Giao Diện
- ✅ **Dark Mode** - Chuyển đổi giữa chế độ sáng/tối
- ✅ **Responsive Design** - Tối ưu cho mobile, tablet và desktop
- ✅ **Carousel** - Banner quảng cáo tự động chuyển slide
- ✅ **Sản phẩm nổi bật** - Hiển thị sản phẩm featured với hiệu ứng hover
- ✅ **Mua theo biểu tượng** - Danh mục sản phẩm theo icon
- ✅ **Trang hỗ trợ** - Hướng dẫn chi tiết về đặt hàng, thanh toán, vận chuyển, đổi trả

## 📁 Cấu Trúc Dự Án

```
ecommerce-project/
├── apps/
│   └── frontend/
│       ├── index.html          # Trang chủ chính
│       ├── css/
│       │   └── style.css       # Stylesheet chính (responsive + dark mode)
│       └── js/
│           ├── main.js         # Khởi tạo ứng dụng và event listeners
│           ├── mock-data.js    # Dữ liệu mẫu ban đầu (không thay đổi)
│           ├── init-data.js    # Khởi tạo dữ liệu vào localStorage
│           ├── products-data.js # Quản lý dữ liệu sản phẩm
│           ├── products-render.js # Render danh sách sản phẩm
│           ├── products-filter.js # Lọc và sắp xếp sản phẩm
│           ├── products-modal.js # Modal chi tiết sản phẩm
│           ├── auth.js         # Xác thực người dùng (đăng ký/đăng nhập)
│           ├── cart.js         # Quản lý giỏ hàng
│           ├── favorites.js    # Quản lý sản phẩm yêu thích
│           ├── orders.js       # Quản lý đơn hàng
│           ├── shipping-addresses.js # Quản lý địa chỉ giao hàng
│           ├── navigation.js   # Điều hướng giữa các trang
│           ├── search-history.js # Lịch sử tìm kiếm
│           ├── dark-mode.js    # Chức năng dark mode
│           ├── carousel.js     # Banner carousel
│           ├── icons.js        # Sản phẩm theo biểu tượng
│           ├── help-topics.js  # Trang hỗ trợ
│           ├── promo-banners.js # Banner khuyến mãi
│           ├── fetch-products.js # Fetch sản phẩm (nếu cần)
│           └── utils.js        # Các hàm tiện ích
└── README.md
```

## 🛠️ Công Nghệ Sử Dụng

- **HTML5** - Cấu trúc trang web
- **CSS3** - Styling với CSS Variables, Flexbox, Grid, Media Queries
- **JavaScript (ES6+)** - Logic ứng dụng, DOM manipulation
- **LocalStorage API** - Lưu trữ dữ liệu phía client
- **Font Awesome 6.4.0** - Icons (CDN)

## 🚦 Cách Sử Dụng

### 1. Mở dự án
Mở file `apps/frontend/index.html` trong trình duyệt web.

**Lưu ý:** Nếu mở trực tiếp từ file system, một số trình duyệt có thể chặn localStorage. Khuyến nghị sử dụng local server:

```bash
# Sử dụng Python
cd apps/frontend
python -m http.server 8000

# Hoặc sử dụng Node.js (nếu có http-server)
npx http-server -p 8000
```

Sau đó truy cập: `http://localhost:8000`

### 2. Khởi tạo dữ liệu
Lần đầu tiên mở trang, dữ liệu mẫu từ `mock-data.js` sẽ tự động được load vào `localStorage`.

### 3. Sử dụng ứng dụng
- **Đăng ký tài khoản** mới hoặc **đăng nhập** với tài khoản đã có
- **Duyệt sản phẩm** từ trang chủ hoặc trang "Sản phẩm"
- **Tìm kiếm** sản phẩm bằng thanh tìm kiếm
- **Thêm vào giỏ hàng** hoặc **yêu thích** sản phẩm
- **Đặt hàng** và quản lý địa chỉ giao hàng
- **Xem lịch sử đơn hàng** trong trang tài khoản

## 📝 Quản Lý Dữ Liệu

### Dữ Liệu Mẫu (mock-data.js)
- Chứa dữ liệu sản phẩm ban đầu
- **Không bao giờ thay đổi** - đây là dữ liệu gốc
- Được load vào localStorage lần đầu tiên

### LocalStorage
Dữ liệu động được lưu trong localStorage với các key:
- `products` - Danh sách sản phẩm (có thể được cập nhật)
- `shoeIcons` - Danh mục biểu tượng giày
- `users` - Tài khoản người dùng
- `cart` - Giỏ hàng (theo user)
- `favorites` - Sản phẩm yêu thích (theo user)
- `orders` - Đơn hàng (theo user)
- `addresses_{userId}` - Địa chỉ giao hàng (theo user)
- `searchHistory` - Lịch sử tìm kiếm
- `darkMode` - Trạng thái dark mode

### Reset Dữ Liệu
Để reset về dữ liệu ban đầu, xóa localStorage:
```javascript
// Mở Console (F12) và chạy:
localStorage.clear();
// Sau đó refresh trang (F5)
```

## 🎨 Dark Mode

Ứng dụng hỗ trợ chế độ tối với:
- Tự động phát hiện preference của hệ thống
- Lưu lựa chọn vào localStorage
- Chuyển đổi mượt mà giữa các chế độ
- Tối ưu contrast cho tất cả các thành phần UI

## 📱 Responsive Design

Website được tối ưu cho:
- **Mobile** (< 768px) - Menu hamburger, layout dọc
- **Tablet** (768px - 1024px) - Layout linh hoạt
- **Desktop** (> 1024px) - Layout đầy đủ

## 🔧 Các File Chính

### `index.html`
- Cấu trúc HTML chính
- Load tất cả các script theo thứ tự đúng
- Chứa các section: header, navigation, products, cart, checkout, account, support

### `css/style.css`
- Stylesheet chính với CSS Variables
- Dark mode styles
- Responsive media queries
- Animations và transitions

### `js/main.js`
- Khởi tạo ứng dụng khi DOM ready
- Setup event listeners chính
- Điều phối các module khác

### `js/products-data.js`
- Quản lý dữ liệu sản phẩm
- Load/save từ localStorage
- Fallback về mock-data nếu cần

### `js/auth.js`
- Xử lý đăng ký/đăng nhập
- Quản lý session người dùng
- Cập nhật UI theo trạng thái đăng nhập

## 🐛 Xử Lý Lỗi

Nếu gặp vấn đề:
1. **Kiểm tra Console** (F12) để xem lỗi JavaScript
2. **Xóa localStorage** và refresh nếu dữ liệu bị lỗi
3. **Kiểm tra Network tab** nếu có vấn đề với CDN (Font Awesome)
4. **Đảm bảo script được load đúng thứ tự** trong `index.html`

## 📄 License

Dự án này được phát triển cho mục đích học tập và demo.

## 👤 Tác Giả

ShopStyle Ecommerce Project

---

**Lưu ý:** Đây là dự án frontend thuần, không có backend server. Tất cả dữ liệu được lưu trữ trong localStorage của trình duyệt.

