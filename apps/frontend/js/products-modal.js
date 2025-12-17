// Product Modal Functions

// Select size
let selectedSize = null;
function selectSize(element) {
    // Remove active from all size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    element.classList.add('active');
    selectedSize = element.dataset.size;
}

// Show product modal (with image gallery)
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalProductDetails');
    const originalPrice = Math.round(product.price * 1.24); // Giả sử giá gốc cao hơn 24%
    const stock = 45; // Số lượng còn
    const reviewCount = 126; // Số đánh giá

    // Chuẩn bị danh sách ảnh: nếu chưa khai báo product.images thì dùng lại 1 ảnh chính 3 lần
    const images = Array.isArray(product.images) && product.images.length
        ? product.images
        : [product.image, product.image, product.image];
    
    modalContent.innerHTML = `
        <div class="modal-product-image-container">
            <div class="modal-main-image-wrapper">
                <img id="modalMainImage" src="${images[0]}" alt="${product.name}" class="modal-product-image" onerror="this.src='${FALLBACK_IMAGE}'">
            </div>
            <div class="modal-image-thumbs">
                ${images.map((img, index) => `
                    <button class="modal-thumb ${index === 0 ? 'active' : ''}" onclick="changeModalImage('${img}', this)">
                        <img src="${img}" alt="${product.name} thumbnail ${index + 1}" onerror="this.src='${FALLBACK_IMAGE}'">
                    </button>
                `).join('')}
            </div>
        </div>
        <div class="modal-product-info">
            <h2 class="modal-product-title">${product.name}</h2>
            <div class="modal-product-meta">
                <span class="modal-category">${product.category}</span>
                <span class="modal-rating">${product.rating}★ (${reviewCount} đánh giá)</span>
                <span class="modal-stock">${stock} còn</span>
            </div>
            <div class="modal-price-section">
                <span class="modal-current-price">${formatPrice(product.price)}</span>
                <span class="modal-original-price">${formatPrice(originalPrice)}</span>
            </div>
            <p class="modal-product-description">${product.description}</p>
            
            <div class="modal-size-section">
                <label class="modal-size-label">Size:</label>
                <div class="modal-size-options">
                    ${product.category === 'Áo' 
                        ? ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => `
                            <button class="size-btn" data-size="${size}" onclick="selectSize(this)">${size}</button>
                        `).join('')
                        : [38, 39, 40, 41, 42, 43].map(size => `
                            <button class="size-btn" data-size="${size}" onclick="selectSize(this)">${size}</button>
                        `).join('')
                    }
                </div>
            </div>

            <div class="modal-quantity-section">
                <label class="modal-quantity-label">Số lượng:</label>
                <div class="modal-quantity-input-wrapper">
                    <input type="number" id="modalQuantity" class="modal-quantity-input" min="1" value="1" />
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn-add-to-cart-modal" onclick="addToCartFromModal(${product.id})">Thêm vào giỏ</button>
                <button class="btn-favorite-modal ${favoritesManager.isFavorite(product.id) ? 'active' : ''}" 
                        onclick="toggleFavoriteFromModal(${product.id})">
                    Yêu thích
                </button>
            </div>
            
            <div class="modal-accordions">
                <div class="accordion-item">
                    <div class="accordion-header" onclick="toggleAccordion(this)">
                        <span>Chi tiết sản phẩm</span>
                        <span class="accordion-icon">+</span>
                    </div>
                    <div class="accordion-content">
                        <p>${product.description}</p>
                        <ul>
                            <li>Chất liệu cao cấp, bền bỉ</li>
                            <li>Thiết kế hiện đại, thời trang</li>
                            <li>Đệm êm ái, thoải mái khi sử dụng</li>
                            <li>Phù hợp cho nhiều hoạt động thể thao</li>
                        </ul>
                    </div>
                </div>
                
                <div class="accordion-item">
                    <div class="accordion-header" onclick="toggleAccordion(this)">
                        <span>Size & Fit</span>
                        <span class="accordion-icon">+</span>
                    </div>
                    <div class="accordion-content">
                        ${product.category === 'Áo' 
                            ? `
                                <p>Vui lòng tham khảo bảng size để chọn size phù hợp:</p>
                                <ul>
                                    <li>XS: Ngực 86-91cm, Vòng eo 71-76cm</li>
                                    <li>S: Ngực 91-96cm, Vòng eo 76-81cm</li>
                                    <li>M: Ngực 96-101cm, Vòng eo 81-86cm</li>
                                    <li>L: Ngực 101-106cm, Vòng eo 86-91cm</li>
                                    <li>XL: Ngực 106-111cm, Vòng eo 91-96cm</li>
                                    <li>XXL: Ngực 111-116cm, Vòng eo 96-101cm</li>
                                </ul>
                            `
                            : `
                                <p>Vui lòng tham khảo bảng size để chọn size phù hợp:</p>
                                <ul>
                                    <li>Size 38: Chân dài 24cm</li>
                                    <li>Size 39: Chân dài 24.5cm</li>
                                    <li>Size 40: Chân dài 25cm</li>
                                    <li>Size 41: Chân dài 25.5cm</li>
                                    <li>Size 42: Chân dài 26cm</li>
                                    <li>Size 43: Chân dài 26.5cm</li>
                                </ul>
                            `
                        }
                    </div>
                </div>
                
                <div class="accordion-item">
                    <div class="accordion-header" onclick="toggleAccordion(this)">
                        <span>Giao hàng & đổi trả</span>
                        <span class="accordion-icon">+</span>
                    </div>
                    <div class="accordion-content">
                        <p><strong>Giao hàng:</strong></p>
                        <ul>
                            <li>Miễn phí vận chuyển cho đơn hàng trên 500.000₫</li>
                            <li>Thời gian giao hàng: 3-7 ngày làm việc</li>
                            <li>Giao hàng nhanh trong nội thành: 1-2 ngày</li>
                        </ul>
                        <p><strong>Đổi trả:</strong></p>
                        <ul>
                            <li>Đổi trả miễn phí trong vòng 7 ngày</li>
                            <li>Sản phẩm phải còn nguyên vẹn, chưa sử dụng</li>
                            <li>Còn đầy đủ tem mác và hộp đựng</li>
                        </ul>
                    </div>
                </div>
                
                <div class="accordion-item">
                    <div class="accordion-header" onclick="toggleAccordion(this)">
                        <span>Đánh giá (${reviewCount})</span>
                        <span class="accordion-icon">+</span>
                    </div>
                    <div class="accordion-content">
                        <div class="reviews-summary">
                            <div class="reviews-rating">
                                <span class="reviews-rating-number">${product.rating}</span>
                                <span class="reviews-rating-stars">${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '½' : ''}</span>
                                <span class="reviews-count">${reviewCount} đánh giá</span>
                            </div>
                        </div>
                        <div class="reviews-list">
                            <p>Đánh giá từ khách hàng sẽ được hiển thị tại đây.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Initialize suggested products in modal
    initModalSuggestedProducts(productId);
    
    modal.style.display = 'block';
    
    // Select first size by default
    const firstSizeBtn = modalContent.querySelector('.size-btn');
    if (firstSizeBtn) {
        selectSize(firstSizeBtn);
    }
}

// Add to cart from modal
function addToCartFromModal(productId) {
    if (!isUserLoggedIn || !isUserLoggedIn()) {
        if (typeof setLastRoute === 'function') {
            setLastRoute('products');
        }
        alert('Vui lòng đăng nhập trước khi thêm vào giỏ hàng.');
        openAuthModal('login');
        return;
    }

    if (!selectedSize) {
        alert('Vui lòng chọn size');
        return;
    }

    const qtyInput = document.getElementById('modalQuantity');
    const qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;

    if (isNaN(qty) || qty <= 0) {
        alert('Vui lòng nhập số lượng hợp lệ (>= 1).');
        return;
    }

    cartManager.addToCart(productId, qty);
    // Optionally close modal or show success message
}

// Đổi ảnh chính trong modal khi chọn thumbnail
function changeModalImage(imageUrl, buttonElement) {
    const mainImg = document.getElementById('modalMainImage');
    if (mainImg) {
        mainImg.src = imageUrl;
    }

    // Cập nhật trạng thái active cho thumbnail
    document.querySelectorAll('.modal-thumb').forEach(btn => btn.classList.remove('active'));
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
}

// Toggle favorite from modal
function toggleFavoriteFromModal(productId) {
    favoritesManager.toggleFavorite(productId);
    showProductModal(productId); // Refresh modal to update favorite button
}

// Toggle accordion
function toggleAccordion(element) {
    const accordionItem = element.parentElement;
    const accordionContent = accordionItem.querySelector('.accordion-content');
    const accordionIcon = element.querySelector('.accordion-icon');
    const isActive = accordionItem.classList.contains('active');
    
    // Close all other accordions
    document.querySelectorAll('.accordion-item').forEach(item => {
        if (item !== accordionItem) {
            item.classList.remove('active');
            item.querySelector('.accordion-icon').textContent = '+';
        }
    });
    
    // Toggle current accordion
    if (isActive) {
        accordionItem.classList.remove('active');
        accordionIcon.textContent = '+';
    } else {
        accordionItem.classList.add('active');
        accordionIcon.textContent = '−';
    }
}

// Initialize suggested products in modal
function initModalSuggestedProducts(currentProductId) {
    const container = document.getElementById('modalSuggestedProducts');
    if (!container) return;
    
    // Get 4 random products excluding current product
    const otherProducts = products.filter(p => p.id !== currentProductId);
    const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
    const suggested = shuffled.slice(0, 4);
    
    container.innerHTML = suggested.map(product => `
        <div class="modal-suggested-card" onclick="showProductModal(${product.id})">
            <div class="modal-suggested-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='${FALLBACK_IMAGE}'">
            </div>
            <div class="modal-suggested-info">
                <div class="modal-suggested-category">${product.category}</div>
                <h4 class="modal-suggested-name">${product.name}</h4>
                <div class="modal-suggested-price">${formatPrice(product.price)}</div>
                <div class="modal-suggested-rating">${product.rating}★</div>
            </div>
        </div>
    `).join('');
}

