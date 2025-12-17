# 🔧 Hướng Dẫn Push Code Lên GitHub - Duy

## ❌ Vấn Đề Hiện Tại
Máy đang dùng tài khoản GitHub `glamour29` nhưng repository là của `qaletdiv`, nên bị lỗi 403 Permission Denied.

## ✅ Giải Pháp (Chọn 1 trong 3 cách)

### Cách 1: Sử dụng Personal Access Token (Khuyến nghị - Dễ nhất)

#### Bước 1: Tạo Personal Access Token
1. Vào GitHub → Click avatar (góc phải trên) → **Settings**
2. Cuộn xuống → **Developer settings** (bên trái)
3. Click **Personal access tokens** → **Tokens (classic)**
4. Click **Generate new token** → **Generate new token (classic)**
5. Đặt tên: `Ecommerce-Project-Duy`
6. Chọn quyền: ✅ **repo** (tất cả quyền trong repo)
7. Click **Generate token**
8. **COPY TOKEN NGAY** (chỉ hiện 1 lần!)

#### Bước 2: Push code
Mở PowerShell hoặc CMD trong thư mục dự án và chạy:

```bash
# Push nhánh main
git push https://YOUR_TOKEN@github.com/qaletdiv/25028-p1-Ecommerce-TrieuDuy.git main

# Hoặc push tất cả nhánh
git push https://YOUR_TOKEN@github.com/qaletdiv/25028-p1-Ecommerce-TrieuDuy.git --all
```

**Thay `YOUR_TOKEN` bằng token bạn vừa copy!**

---

### Cách 2: Xóa Credentials Cũ và Đăng Nhập Lại

#### Bước 1: Xóa credentials cũ
```bash
# Xóa credentials đã lưu
git credential-manager-core erase
# Hoặc trên Windows:
git credential-manager erase https://github.com
```

#### Bước 2: Push lại (sẽ hỏi đăng nhập)
```bash
git push duy main
```
Khi hỏi username: nhập `qaletdiv`
Khi hỏi password: **NHẬP PERSONAL ACCESS TOKEN** (không phải password GitHub!)

---

### Cách 3: Sử dụng SSH (An toàn nhất)

#### Bước 1: Tạo SSH Key
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```
Nhấn Enter để chấp nhận đường dẫn mặc định, không cần passphrase.

#### Bước 2: Copy Public Key
```bash
# Windows
type C:\Users\%USERNAME%\.ssh\id_ed25519.pub
# Hoặc mở file bằng Notepad
notepad C:\Users\%USERNAME%\.ssh\id_ed25519.pub
```

Copy toàn bộ nội dung (bắt đầu bằng `ssh-ed25519`)

#### Bước 3: Thêm SSH Key vào GitHub
1. GitHub → Settings → **SSH and GPG keys**
2. Click **New SSH key**
3. Title: `My Laptop - Duy`
4. Key: Paste key vừa copy
5. Click **Add SSH key**

#### Bước 4: Đổi Remote sang SSH
```bash
git remote set-url duy git@github.com:qaletdiv/25028-p1-Ecommerce-TrieuDuy.git
```

#### Bước 5: Push
```bash
git push duy main
git push duy --all
```

---

## 🚀 Push Tất Cả Nhánh

Sau khi đã cấu hình xong, chạy:

```bash
# Push tất cả nhánh
git push duy --all

# Hoặc push từng nhánh
git push duy main
git push duy feature/homepage-duy
git push duy feature/products-filter-duy
git push duy feature/cart-favorites-duy
git push duy feature/auth-duy-new
git push duy feature/checkout-orders-duy
git push duy feature/user-account-duy
git push duy feature/support-duy
```

---

## 📋 Kiểm Tra

Sau khi push xong, vào:
https://github.com/qaletdiv/25028-p1-Ecommerce-TrieuDuy

Bạn sẽ thấy:
- ✅ File `README.md`
- ✅ Thư mục `apps/frontend/` với tất cả code
- ✅ Các nhánh feature trong tab "Branches"

---

## 💡 Khuyến Nghị

**Dùng Cách 1 (Personal Access Token)** vì:
- ✅ Dễ làm nhất
- ✅ Không cần cấu hình phức tạp
- ✅ An toàn (có thể xóa token bất cứ lúc nào)

