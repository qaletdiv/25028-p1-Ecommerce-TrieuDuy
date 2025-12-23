// Cart Manager
const cartManager = {
    items: [],
    
    // Load cart from localStorage
    init() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
        this.updateCartUI();
    },
    
    // Save cart to localStorage
    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartUI();
    },
    
    // Add product to cart (with size and quantity)
    addToCart(productId, quantity = 1, size = null) {
        if (!isUserLoggedIn || !isUserLoggedIn()) {
            if (typeof setLastRoute === 'function') {
                setLastRoute('cart');
            }
            alert('Vui lòng đăng nhập trước khi thêm vào giỏ hàng.');
            openAuthModal('login');
            return;
        }

        if (!size) {
            alert('Vui lòng chọn size trước khi thêm vào giỏ hàng.');
            return;
        }

        const qty = parseInt(quantity, 10);
        if (isNaN(qty) || qty <= 0) {
            alert('Số lượng không hợp lệ.');
            return;
        }
        const product = getProductById(productId);
        if (!product) return;
        
        // Tìm item cùng sản phẩm VÀ cùng size
        const existingItem = this.items.find(item => item.id === productId && item.size === size);
        
        if (existingItem) {
            existingItem.quantity += qty;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: qty,
                size: size
            });
        }
        
        this.save();
        this.showNotification('Đã thêm vào giỏ hàng!');
    },
    
    // Remove item from cart (by index to handle same product with different sizes)
    removeFromCart(index) {
        this.items.splice(index, 1);
        this.save();
        this.renderCart();
    },
    
    // Update quantity (by index)
    updateQuantity(index, change) {
        if (index < 0 || index >= this.items.length) return;
        
        const item = this.items[index];
        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeFromCart(index);
        } else {
            this.save();
            this.renderCart();
        }
    },
    
    // Get total price
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    // Get total items count
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    // Update cart UI (count badge)
    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.getTotalItems();
        }
    },
    
    // Render cart modal
    renderCart() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (!cartItems) return;
        
        if (this.items.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #7f8c8d;">Giỏ hàng trống</p>';
            if (cartTotal) cartTotal.textContent = '0₫';
            return;
        }
        
        cartItems.innerHTML = this.items.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.style.display='none'">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-size" style="font-size: 0.9rem; color: #7f8c8d; margin-top: 0.25rem;">Size: ${item.size || 'N/A'}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="cartManager.updateQuantity(${index}, -1)">-</button>
                    <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                    <button class="quantity-btn" onclick="cartManager.updateQuantity(${index}, 1)">+</button>
                </div>
                <button onclick="cartManager.removeFromCart(${index})" style="background: #e74c3c; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Xóa</button>
            </div>
        `).join('');
        
        if (cartTotal) {
            cartTotal.textContent = formatPrice(this.getTotal());
        }
    },
    
    // Show notification
    showNotification(message) {
        // Simple notification (you can enhance this)
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideIn 0.3s;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
};

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

