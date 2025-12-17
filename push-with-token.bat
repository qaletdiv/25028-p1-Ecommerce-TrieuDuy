@echo off
REM Script push code với Personal Access Token - Duy
REM Cách dùng: 
REM 1. Tạo Personal Access Token trên GitHub (xem HUONG_DAN_PUSH.md)
REM 2. Chạy file này và nhập token khi được hỏi

echo ========================================
echo    PUSH CODE LEN GITHUB - DUY
echo ========================================
echo.

REM Kiểm tra remote
echo [1/3] Kiem tra remote...
git remote -v
echo.

REM Nhập token
set /p TOKEN="Nhap Personal Access Token cua ban: "
if "%TOKEN%"=="" (
    echo ❌ Token khong duoc de trong!
    pause
    exit /b 1
)

echo.
echo [2/3] Dang push nhánh main...
git push https://%TOKEN%@github.com/qaletdiv/25028-p1-Ecommerce-TrieuDuy.git main
if errorlevel 1 (
    echo ❌ Loi khi push main!
    pause
    exit /b 1
)

echo.
echo [3/3] Dang push tat ca cac nhanh feature...
git push https://%TOKEN%@github.com/qaletdiv/25028-p1-Ecommerce-TrieuDuy.git feature/homepage-duy
git push https://%TOKEN%@github.com/qaletdiv/25028-p1-Ecommerce-TrieuDuy.git feature/products-filter-duy
git push https://%TOKEN%@github.com/qaletdiv/25028-p1-Ecommerce-TrieuDuy.git feature/cart-favorites-duy
git push https://%TOKEN%@github.com/qaletdiv/25028-p1-Ecommerce-TrieuDuy.git feature/auth-duy-new
git push https://%TOKEN%@github.com/qaletdiv/25028-p1-Ecommerce-TrieuDuy.git feature/checkout-orders-duy
git push https://%TOKEN%@github.com/qaletdiv/25028-p1-Ecommerce-TrieuDuy.git feature/user-account-duy
git push https://%TOKEN%@github.com/qaletdiv/25028-p1-Ecommerce-TrieuDuy.git feature/support-duy

echo.
echo ========================================
echo    ✅ HOAN THANH!
echo ========================================
echo.
echo 🔗 Xem tai: https://github.com/qaletdiv/25028-p1-Ecommerce-TrieuDuy
echo.
pause

