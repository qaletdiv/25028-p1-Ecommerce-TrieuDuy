// Shipping Addresses Management

function renderSavedAddresses() {
    const container = document.getElementById('savedAddressesList');
    if (!container) return;

    const user = getCurrentUser();
    if (!user || !user.addresses || !user.addresses.length) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = user.addresses.map((addr, index) => `
        <div class="saved-address-item ${addr.default ? 'default active' : ''}" data-index="${index}" onclick="selectAddress(this, ${index})">
            <div class="address-info">
                <div class="address-header">
                    <strong>${addr.name}</strong>
                    ${addr.default ? '<span class="address-default-badge">Mặc định</span>' : ''}
                </div>
                <div class="address-phone">${addr.phone}</div>
                <div class="address-text">${addr.address}</div>
            </div>
            <div class="address-actions" onclick="event.stopPropagation()">
                ${!addr.default ? `<button class="btn-link" onclick="setDefaultAddress(${index})">Đặt mặc định</button>` : ''}
                <button class="btn-link" onclick="useAddress(${index})">Sử dụng</button>
                <button class="btn-link text-danger" onclick="deleteAddress(${index})">Xóa</button>
            </div>
        </div>
    `).join('');
}

function selectAddress(element, index) {
    // Remove active from all addresses
    document.querySelectorAll('.saved-address-item').forEach(item => {
        item.classList.remove('active');
    });
    // Add active to selected
    element.classList.add('active');
    // Use the address
    useAddress(index);
}

function useAddress(index) {
    const user = getCurrentUser();
    if (!user || !user.addresses || !user.addresses[index]) return;

    const addr = user.addresses[index];
    document.getElementById('shippingName').value = addr.name;
    document.getElementById('shippingPhone').value = addr.phone;
    document.getElementById('shippingAddress').value = addr.address;
    
    // Show form if hidden
    const form = document.getElementById('newAddressForm');
    if (form) form.style.display = 'block';
}

function setDefaultAddress(index) {
    const user = getCurrentUser();
    if (!user || !user.addresses) return;

    // Remove default from all addresses
    user.addresses.forEach(addr => addr.default = false);
    // Set this address as default
    user.addresses[index].default = true;

    // Save to localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }

    renderSavedAddresses();
}

function deleteAddress(index) {
    if (!confirm('Bạn có chắc muốn xóa địa chỉ này?')) return;

    const user = getCurrentUser();
    if (!user || !user.addresses) return;

    user.addresses.splice(index, 1);

    // Save to localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }

    renderSavedAddresses();
}

function toggleNewAddressForm() {
    const form = document.getElementById('newAddressForm');
    const btn = document.getElementById('toggleNewAddressBtn');
    if (!form || !btn) return;

    if (form.style.display === 'none' || !form.style.display) {
        form.style.display = 'block';
        btn.textContent = '- Ẩn form';
    } else {
        form.style.display = 'none';
        btn.textContent = '+ Thêm địa chỉ mới';
    }
}

function saveCurrentAddressAsNew() {
    const user = getCurrentUser();
    if (!user) {
        alert('Vui lòng đăng nhập để lưu địa chỉ.');
        return;
    }

    const name = document.getElementById('shippingName').value.trim();
    const phone = document.getElementById('shippingPhone').value.trim();
    const address = document.getElementById('shippingAddress').value.trim();

    if (!name || !phone || !address) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
    }

    if (!user.addresses) {
        user.addresses = [];
    }

    const saveCheckbox = document.getElementById('saveAddressCheckbox');
    const isDefault = saveCheckbox && saveCheckbox.checked;

    // If this is default, remove default from others
    if (isDefault) {
        user.addresses.forEach(addr => addr.default = false);
    }

    // If no addresses, make this default
    if (user.addresses.length === 0) {
        user.addresses.push({ name, phone, address, default: true });
    } else {
        user.addresses.push({ name, phone, address, default: isDefault || false });
    }

    // Save to localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }

    renderSavedAddresses();
    alert('Đã lưu địa chỉ thành công!');
}

function loadUserAddresses() {
    const user = getCurrentUser();
    if (!user || !user.addresses) return [];
    return user.addresses.map((addr, index) => ({ ...addr, id: index.toString() }));
}

function addUserAddress(addressInfo) {
    const user = getCurrentUser();
    if (!user) return;

    if (!user.addresses) {
        user.addresses = [];
    }

    if (addressInfo.isDefault) {
        user.addresses.forEach(addr => addr.default = false);
    }

    if (user.addresses.length === 0) {
        user.addresses.push({ ...addressInfo, default: true });
    } else {
        user.addresses.push({ ...addressInfo });
    }

    // Save to localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }

    renderSavedAddresses();
}

