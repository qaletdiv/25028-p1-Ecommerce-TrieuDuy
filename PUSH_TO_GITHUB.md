# Hướng dẫn Push Code lên GitHub - Duy

## Các nhánh đã được tạo:

1. **main** - Nhánh chính chứa toàn bộ code
2. **feature/homepage-duy** - Trang chủ với carousel, featured products
3. **feature/products-filter-duy** - Trang sản phẩm với filter và pagination
4. **feature/cart-favorites-duy** - Giỏ hàng và yêu thích
5. **feature/auth-duy-new** - Đăng nhập/Đăng ký
6. **feature/checkout-orders-duy** - Thanh toán và quản lý đơn hàng
7. **feature/user-account-duy** - Tài khoản người dùng với dropdown
8. **feature/support-duy** - Trang hỗ trợ

## Cách Push Code:

### Bước 1: Cấu hình Git Credentials (nếu chưa có)

```bash
git config --global user.name "TrieuDuy"
git config --global user.email "your-email@example.com"
```

### Bước 2: Xác thực với GitHub

Bạn có 2 cách:

**Cách 1: Sử dụng Personal Access Token (Khuyến nghị)**
1. Vào GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Tạo token mới với quyền `repo`
3. Copy token và sử dụng khi push (sẽ hỏi password, paste token vào)

**Cách 2: Sử dụng SSH Key**
1. Tạo SSH key: `ssh-keygen -t ed25519 -C "your-email@example.com"`
2. Copy public key và thêm vào GitHub → Settings → SSH and GPG keys
3. Đổi remote URL sang SSH:
   ```bash
   git remote set-url duy git@github.com:qaletdiv/25028-p1-Ecommerce-TrieuDuy.git
   ```

### Bước 3: Push các nhánh

Chạy script `push-all-branches.sh` hoặc chạy từng lệnh:

```bash
# Push nhánh main
git push duy main

# Push các nhánh feature
git push duy feature/homepage-duy
git push duy feature/products-filter-duy
git push duy feature/cart-favorites-duy
git push duy feature/auth-duy-new
git push duy feature/checkout-orders-duy
git push duy feature/user-account-duy
git push duy feature/support-duy
```

### Hoặc push tất cả nhánh cùng lúc:

```bash
git push duy --all
```

## Kiểm tra Remote:

```bash
git remote -v
```

Bạn sẽ thấy:
- `origin` → repository cũ
- `duy` → repository mới của bạn

## Lưu ý:

- Repository `duy` đã được thêm vào remote với tên `duy`
- Tất cả code đã được commit và sẵn sàng push
- Nếu gặp lỗi permission, hãy đảm bảo bạn đã đăng nhập đúng tài khoản GitHub

