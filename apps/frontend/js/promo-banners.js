// Promotional Banners Functions

// Initialize promotional banners
function initPromoBanners() {
    const banner1 = document.getElementById('promoBanner1');
    const banner2 = document.getElementById('promoBanner2');
    
    if (banner1) {
        banner1.innerHTML = `
            <div class="promo-content">
                <h2>Bộ sưu tập mới</h2>
                <h1>Xuân 2024</h1>
                <p>Khám phá xu hướng thời trang thể thao mới nhất</p>
                <button class="btn-promo">Mua ngay</button>
            </div>
        `;
        banner1.style.backgroundImage = "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&h=800&fit=crop')";
    }
    
    if (banner2) {
        banner2.innerHTML = `
            <div class="promo-content">
                <h2>Phiên bản giới hạn</h2>
                <h1>Chất lượng cao cấp</h1>
                <p>Thiết kế độc quyền cho vận động viên hiện đại</p>
                <button class="btn-promo">Khám phá</button>
            </div>
        `;
        banner2.style.backgroundImage = "url('https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1920&h=800&fit=crop')";
    }
}


