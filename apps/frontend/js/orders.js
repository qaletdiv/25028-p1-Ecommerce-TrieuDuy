// Orders & Checkout Management

let orders = []; // all orders stored in localStorage

function loadOrders() {
    const saved = localStorage.getItem('orders');
    orders = saved ? JSON.parse(saved) : [];
}

function saveOrders() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
}

function getCurrentUserOrders(email) {
    return orders.filter(o => o.userEmail === email);
}

// Điều hướng từ giỏ hàng sang trang checkout
function goToCheckout() {
    if (!isUserLoggedIn()) {
        if (typeof setLastRoute === 'function') {
            setLastRoute('checkout');
        }
        alert('Vui lòng đăng nhập trước khi thanh toán.');
        openAuthModal('login');
        return;
    }

    if (!cartManager || cartManager.items.length === 0) {
        alert('Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước.');
        return;
    }

    // Render tóm tắt đơn hàng
    renderCheckoutSummary();
    
    // Render saved addresses
    if (typeof renderSavedAddresses === 'function') {
        renderSavedAddresses();
    }

    // Ẩn các section khác, chỉ hiển thị checkout
    const sectionsToHide = ['featured', 'latest', 'products', 'support'];
    const heroCarousel = document.querySelector('.hero-carousel');
    const signatureSection = document.querySelector('.signature-section');
    const rotationSection = document.querySelector('.sneaker-rotation-section');
    const iconsSection = document.querySelector('.shop-by-icons-section');
    const promoBanners = document.querySelector('.promo-banners');
    const suggested = document.querySelector('.suggested-section');
    const checkout = document.getElementById('checkout');
    const orderConfirmation = document.getElementById('orderConfirmation');
    const account = document.getElementById('account');

    if (heroCarousel) heroCarousel.style.display = 'none';
    if (signatureSection) signatureSection.style.display = 'none';
    if (rotationSection) rotationSection.style.display = 'none';
    if (iconsSection) iconsSection.style.display = 'none';
    if (promoBanners) promoBanners.style.display = 'none';
    if (suggested) suggested.style.display = 'none';

    sectionsToHide.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    if (orderConfirmation) orderConfirmation.style.display = 'none';
    if (account) account.style.display = 'none';
    if (checkout) checkout.style.display = 'block';

    // Đóng modal giỏ hàng nếu đang mở
    closeModal('cartModal');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCheckoutSummary() {
    const itemsContainer = document.getElementById('checkoutSummaryItems');
    const totalEl = document.getElementById('checkoutSummaryTotal');
    if (!itemsContainer || !totalEl) return;

    if (!cartManager || cartManager.items.length === 0) {
        itemsContainer.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 1rem;">Giỏ hàng trống.</p>';
        totalEl.textContent = '0₫';
        return;
    }

    itemsContainer.innerHTML = cartManager.items.map(item => `
        <div class="checkout-summary-item">
            <div class="checkout-summary-item-main">
                <span class="checkout-item-name">${item.name}</span>
                <div class="checkout-item-details">
                    <span class="checkout-item-size">Size: ${item.size || 'N/A'}</span>
                    <span class="checkout-item-qty">Số lượng: x${item.quantity}</span>
                </div>
            </div>
            <div class="checkout-summary-item-price">
                ${formatPrice(item.price * item.quantity)}
            </div>
        </div>
    `).join('');

    totalEl.textContent = formatPrice(cartManager.getTotal());
}

// Submit checkout form
function submitCheckout(event) {
    event.preventDefault();

    // Kiểm tra lại user đã đăng nhập
    if (!isUserLoggedIn || !isUserLoggedIn()) {
        alert('Vui lòng đăng nhập trước khi xác nhận đơn hàng.');
        if (typeof openAuthModal === 'function') {
            openAuthModal('login');
        }
        if (typeof setLastRoute === 'function') {
            setLastRoute('checkout');
        }
        return;
    }

    // Kiểm tra lại có sản phẩm trong giỏ hàng
    if (!cartManager || !cartManager.items || cartManager.items.length === 0) {
        alert('Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.');
        if (typeof showHomePage === 'function') {
            showHomePage(null);
        }
        return;
    }

    const user = getCurrentUser();
    if (!user) {
        alert('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
        if (typeof openAuthModal === 'function') {
            openAuthModal('login');
        }
        return;
    }

    // Kiểm tra xem user đã chọn địa chỉ đã lưu hay nhập mới
    const selectedAddressRadio = document.querySelector('input[name="selectedAddress"]:checked');
    let name, phone, address;
    
    if (selectedAddressRadio && typeof loadUserAddresses === 'function') {
        // User chọn địa chỉ đã lưu
        const addresses = loadUserAddresses();
        const selectedAddress = addresses.find(addr => addr.id === selectedAddressRadio.value);
        if (selectedAddress) {
            name = selectedAddress.name;
            phone = selectedAddress.phone;
            address = selectedAddress.address;
        } else {
            alert('Địa chỉ đã chọn không tồn tại. Vui lòng chọn lại.');
            return;
        }
    } else {
        // User nhập địa chỉ mới
        const nameInput = document.getElementById('shippingName');
        const phoneInput = document.getElementById('shippingPhone');
        const addressInput = document.getElementById('shippingAddress');

        if (!nameInput || !phoneInput || !addressInput) {
            alert('Có lỗi xảy ra. Vui lòng tải lại trang.');
            return;
        }

        name = nameInput.value.trim();
        phone = phoneInput.value.trim();
        address = addressInput.value.trim();

        // Validation cho địa chỉ mới
        if (!name || name.length < 2) {
            alert('Vui lòng nhập họ và tên hợp lệ (ít nhất 2 ký tự).');
            nameInput.focus();
            return;
        }

        if (!phone || !/^[0-9]{10,11}$/.test(phone)) {
            alert('Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số).');
            phoneInput.focus();
            return;
        }

        if (!address || address.length < 10) {
            alert('Vui lòng nhập địa chỉ giao hàng đầy đủ (ít nhất 10 ký tự).');
            addressInput.focus();
            return;
        }
    }

    loadOrders();

    const orderId = generateOrderId();
    const now = new Date();
    const order = {
        id: orderId,
        userEmail: user.email,
        userName: user.name,
        createdAt: now.toISOString(),
        items: cartManager.items.map(i => ({ ...i })),
        total: cartManager.getTotal(),
        shipping: { name, phone, address },
        status: 'Đang xử lý'
    };

    orders.push(order);
    saveOrders();

    // Lưu đơn hàng vào user (lịch sử)
    addOrderToUser(order);
    
    // Lưu địa chỉ nếu user nhập mới và chọn lưu
    const saveAddressCheckbox = document.getElementById('saveAddressCheckbox');
    if (!selectedAddressRadio && saveAddressCheckbox && saveAddressCheckbox.checked && typeof addUserAddress === 'function') {
        const shippingInfo = { name, phone, address, isDefault: false };
        addUserAddress(shippingInfo);
    }

    // Làm trống giỏ hàng sau khi đặt hàng thành công
    cartManager.items = [];
    cartManager.save();
    cartManager.renderCart();
    cartManager.updateCartUI();

    // Reset form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.reset();
    }
    
    // Re-render saved addresses
    if (typeof renderSavedAddresses === 'function') {
        renderSavedAddresses();
    }

    // Chuyển đến trang xác nhận đơn hàng
    showOrderConfirmation(order);
}

function showOrderConfirmation(order) {
    const checkout = document.getElementById('checkout');
    const orderConfirmation = document.getElementById('orderConfirmation');
    const account = document.getElementById('account');
    const heroCarousel = document.querySelector('.hero-carousel');
    const signatureSection = document.querySelector('.signature-section');
    const rotationSection = document.querySelector('.sneaker-rotation-section');
    const iconsSection = document.querySelector('.shop-by-icons-section');
    const promoBanners = document.querySelector('.promo-banners');
    const featured = document.getElementById('featured');
    const latest = document.getElementById('latest');
    const products = document.getElementById('products');
    const suggested = document.querySelector('.suggested-section');
    const support = document.getElementById('support');

    [heroCarousel, signatureSection, rotationSection, iconsSection, promoBanners,
     featured, latest, products, suggested, support, checkout, account].forEach(el => {
        if (el) el.style.display = 'none';
    });

    if (orderConfirmation) orderConfirmation.style.display = 'block';

    const summaryEl = document.getElementById('orderConfirmationSummary');
    if (summaryEl) {
        summaryEl.innerHTML = `
            <div class="order-summary-block">
                <h3>Thông tin đơn hàng</h3>
                <p><strong>Mã đơn hàng:</strong> ${order.id}</p>
                <p><strong>Ngày đặt:</strong> ${new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                <p><strong>Trạng thái:</strong> ${order.status}</p>
            </div>
            <div class="order-summary-block">
                <h3>Thông tin giao hàng</h3>
                <p><strong>Họ và tên:</strong> ${order.shipping.name}</p>
                <p><strong>Số điện thoại:</strong> ${order.shipping.phone}</p>
                <p><strong>Địa chỉ:</strong> ${order.shipping.address}</p>
            </div>
            <div class="order-summary-block">
                <h3>Sản phẩm</h3>
                ${order.items.map(item => `
                    <div class="order-item">
                        <div>
                            <span>${item.name}</span>
                            ${item.size ? `<span style="color: #7f8c8d; font-size: 0.9rem; margin-left: 0.5rem;">Size: ${item.size}</span>` : ''}
                            <span style="color: #7f8c8d; font-size: 0.9rem; margin-left: 0.5rem;">x${item.quantity}</span>
                        </div>
                        <span>${formatPrice(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
                <div class="order-total-line">
                    <strong>Tổng cộng:</strong>
                    <strong>${formatPrice(order.total)}</strong>
                </div>
            </div>
        `;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Thêm đơn hàng vào lịch sử user trong localStorage
function addOrderToUser(order) {
    const usersRaw = localStorage.getItem('users') || '[]';
    const users = JSON.parse(usersRaw);
    const idx = users.findIndex(u => u.email === order.userEmail);
    if (idx === -1) return;

    if (!Array.isArray(users[idx].orders)) {
        users[idx].orders = [];
    }
    users[idx].orders.push({
        id: order.id,
        createdAt: order.createdAt,
        total: order.total,
        status: order.status
    });

    localStorage.setItem('users', JSON.stringify(users));
}

// Hiển thị trang tài khoản
function showAccountPage(event) {
    if (event) event.preventDefault();

    if (!isUserLoggedIn()) {
        if (typeof setLastRoute === 'function') {
            setLastRoute('account');
        }
        alert('Vui lòng đăng nhập để xem tài khoản.');
        openAuthModal('login');
        return;
    }

    const heroCarousel = document.querySelector('.hero-carousel');
    const signatureSection = document.querySelector('.signature-section');
    const rotationSection = document.querySelector('.sneaker-rotation-section');
    const iconsSection = document.querySelector('.shop-by-icons-section');
    const promoBanners = document.querySelector('.promo-banners');
    const featured = document.getElementById('featured');
    const latest = document.getElementById('latest');
    const products = document.getElementById('products');
    const suggested = document.querySelector('.suggested-section');
    const support = document.getElementById('support');
    const checkout = document.getElementById('checkout');
    const orderConfirmation = document.getElementById('orderConfirmation');
    const account = document.getElementById('account');

    [heroCarousel, signatureSection, rotationSection, iconsSection, promoBanners,
     featured, latest, products, suggested, support, checkout, orderConfirmation].forEach(el => {
        if (el) el.style.display = 'none';
    });

    if (account) account.style.display = 'block';

    renderAccountPage();

    // Cập nhật active nav (không có link riêng nên chỉ bỏ active ở tất cả)
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderAccountPage() {
    const user = getCurrentUser();
    if (!user) return;

    const nameEl = document.getElementById('accountName');
    const emailEl = document.getElementById('accountEmail');
    const emptyEl = document.getElementById('accountOrdersEmpty');
    const listEl = document.getElementById('accountOrdersList');

    if (nameEl) nameEl.textContent = user.name || '(Không tên)';
    if (emailEl) emailEl.textContent = user.email || '-';

    loadOrders();
    const userOrders = getCurrentUserOrders(user.email);

    if (!userOrders.length) {
        if (emptyEl) emptyEl.style.display = 'block';
        if (listEl) {
            listEl.style.display = 'none';
            listEl.innerHTML = '';
        }
        return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (!listEl) return;

    listEl.style.display = 'block';
    listEl.innerHTML = userOrders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(order => `
            <div class="account-order-item">
                <div class="account-order-main">
                    <div>
                        <div class="account-order-id">Mã đơn: ${order.id}</div>
                        <div class="account-order-date">Ngày đặt: ${new Date(order.createdAt).toLocaleString('vi-VN')}</div>
                    </div>
                    <div class="account-order-status ${order.status === 'Đã hủy' ? 'status-cancelled' : ''}">${order.status}</div>
                </div>
                <div class="account-order-total">
                    Tổng tiền: <strong>${formatPrice(order.total)}</strong>
                </div>
                ${order.status === 'Đã hủy' && order.cancelReason ? `
                    <div class="account-order-cancel-reason">
                        Lý do hủy: <em>${order.cancelReason}</em>
                    </div>
                ` : ''}
                ${order.status === 'Đang xử lý' ? `
                    <div class="account-order-actions">
                        <button class="btn-secondary btn-cancel-order" onclick="openCancelOrderModal('${order.id}')">
                            Hủy đơn hàng
                        </button>
                    </div>
                ` : ''}
            </div>
        `).join('');
}

// ----- HỦY ĐƠN HÀNG -----
let orderToCancelId = null;

function openCancelOrderModal(orderId) {
    orderToCancelId = orderId;
    const modal = document.getElementById('cancelOrderModal');
    if (modal) modal.style.display = 'block';

    const form = document.getElementById('cancelOrderForm');
    if (form) form.reset();
}

function submitCancelOrder(event) {
    event.preventDefault();
    if (!orderToCancelId) return;

    loadOrders();
    const orderIndex = orders.findIndex(o => o.id === orderToCancelId);
    if (orderIndex === -1) {
        alert('Không tìm thấy đơn hàng cần hủy.');
        return;
    }

    const order = orders[orderIndex];
    if (order.status !== 'Đang xử lý') {
        alert('Chỉ có thể hủy đơn hàng đang trong trạng thái "Đang xử lý".');
        return;
    }

    // Lấy lý do
    const radios = document.querySelectorAll('input[name="cancelReason"]');
    let selectedValue = null;
    radios.forEach(r => { if (r.checked) selectedValue = r.value; });

    let finalReason = selectedValue || 'Không cung cấp lý do';
    const otherRadio = document.getElementById('cancelReasonOtherRadio');
    const otherText = document.getElementById('cancelReasonOtherText');
    if (otherRadio && otherRadio.checked && otherText && otherText.value.trim()) {
        finalReason = otherText.value.trim();
    }

    order.status = 'Đã hủy';
    order.cancelReason = finalReason;
    order.cancelAt = new Date().toISOString();
    orders[orderIndex] = order;
    saveOrders();

    updateUserOrderStatus(order.id, order.status, finalReason, order.cancelAt);

    alert('Đơn hàng đã được hủy.');
    orderToCancelId = null;
    closeModal('cancelOrderModal');

    if (typeof renderAccountPage === 'function') {
        renderAccountPage();
    }
}

function updateUserOrderStatus(orderId, status, cancelReason, cancelAt) {
    const usersRaw = localStorage.getItem('users') || '[]';
    const users = JSON.parse(usersRaw);
    let changed = false;

    users.forEach(u => {
        if (Array.isArray(u.orders)) {
            const idx = u.orders.findIndex(o => o.id === orderId);
            if (idx !== -1) {
                u.orders[idx].status = status;
                if (cancelReason) u.orders[idx].cancelReason = cancelReason;
                if (cancelAt) u.orders[idx].cancelAt = cancelAt;
                changed = true;
            }
        }
    });

    if (changed) {
        localStorage.setItem('users', JSON.stringify(users));
    }
}


