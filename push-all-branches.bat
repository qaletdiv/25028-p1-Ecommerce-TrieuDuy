@echo off
REM Script để push tất cả các nhánh lên GitHub - Duy (Windows)
REM Chạy: push-all-branches.bat

echo 🚀 Bắt đầu push code lên GitHub...

REM Kiểm tra remote
echo 📋 Kiểm tra remote...
git remote -v

REM Push nhánh main
echo 📤 Pushing main...
git push duy main

REM Push các nhánh feature
echo 📤 Pushing feature/homepage-duy...
git push duy feature/homepage-duy

echo 📤 Pushing feature/products-filter-duy...
git push duy feature/products-filter-duy

echo 📤 Pushing feature/cart-favorites-duy...
git push duy feature/cart-favorites-duy

echo 📤 Pushing feature/auth-duy-new...
git push duy feature/auth-duy-new

echo 📤 Pushing feature/checkout-orders-duy...
git push duy feature/checkout-orders-duy

echo 📤 Pushing feature/user-account-duy...
git push duy feature/user-account-duy

echo 📤 Pushing feature/support-duy...
git push duy feature/support-duy

echo ✅ Hoàn thành! Tất cả các nhánh đã được push lên GitHub.
echo 🔗 Xem tại: https://github.com/qaletdiv/25028-p1-Ecommerce-TrieuDuy

pause

