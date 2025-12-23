// Shipping Addresses Management

// Load saved addresses for current user
function loadUserAddresses() {
    const user = getCurrentUser();
    if (!user) return [];
    
    const users = loadUsers();
    const userData = users.find(u => u.email === user.email);
    if (!userData || !userData.addresses) return [];
    
    return userData.addresses;
}

// Save addresses to user data
function saveUserAddresses(addresses) {
    const user = getCurrentUser();
    if (!user) return;
    
    const users = loadUsers();
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex === -1) return;
    
    users[userIndex].addresses = addresses;
    saveUsers(users);
}

// Add new address
function addUserAddress(address) {
    const addresses = loadUserAddresses();
    const newAddress = {
        id: Date.now().toString(),
        name: address.name,
        phone: address.phone,
        address: address.address,
        isDefault: addresses.length === 0 || address.isDefault // First address or explicitly set as default
    };
    
    // If this is set as default, unset others
    if (newAddress.isDefault) {
        addresses.forEach(addr => addr.isDefault = false);
    }
    
    addresses.push(newAddress);
    saveUserAddresses(addresses);
    return newAddress;
}

// Set default address
function setDefaultAddress(addressId) {
    const addresses = loadUserAddresses();
    addresses.forEach(addr => {
        addr.isDefault = addr.id === addressId;
    });
    saveUserAddresses(addresses);
}

// Delete address
function deleteUserAddress(addressId) {
    const addresses = loadUserAddresses();
    const filtered = addresses.filter(addr => addr.id !== addressId);
    saveUserAddresses(filtered);
}

// Get default address
function getDefaultAddress() {
    const addresses = loadUserAddresses();
    return addresses.find(addr => addr.isDefault) || addresses[0] || null;
}

// Render saved addresses in checkout
function renderSavedAddresses() {
    const container = document.getElementById('savedAddressesList');
    const newAddressForm = document.getElementById('newAddressForm');
    const toggleBtn = document.getElementById('toggleNewAddressBtn');
    
    if (!container) return;
    
    const addresses = loadUserAddresses();
    
    if (addresses.length === 0) {
        container.innerHTML = '';
        container.style.display = 'none';
        if (newAddressForm) newAddressForm.style.display = 'block';
        if (toggleBtn) toggleBtn.style.display = 'none';
        return;
    }
    
    // Show saved addresses list
    container.style.display = 'block';
    if (newAddressForm) newAddressForm.style.display = 'none';
    if (toggleBtn) {
        toggleBtn.style.display = 'block';
        toggleBtn.textContent = '+ Thêm địa chỉ mới';
    }
    
    container.innerHTML = addresses.map(addr => `
        <div class="saved-address-item ${addr.isDefault ? 'default' : ''}" data-address-id="${addr.id}">
            <div class="address-radio-wrapper">
                <input type="radio" name="selectedAddress" value="${addr.id}" id="address_${addr.id}" ${addr.isDefault ? 'checked' : ''} onchange="selectSavedAddress('${addr.id}')">
                <label for="address_${addr.id}" class="address-label">
                    <div class="address-header">
                        <strong class="address-name">${addr.name}</strong>
                        ${addr.isDefault ? '<span class="default-badge">Mặc định</span>' : ''}
                    </div>
                    <div class="address-details">
                        <p class="address-phone">📞 ${addr.phone}</p>
                        <p class="address-text">📍 ${addr.address}</p>
                    </div>
                </label>
            </div>
            <div class="address-actions">
                ${!addr.isDefault ? `<button class="btn-set-default" onclick="setAddressAsDefault('${addr.id}')" title="Đặt làm mặc định">⭐</button>` : ''}
                <button class="btn-delete-address" onclick="deleteAddress('${addr.id}')" title="Xóa địa chỉ">🗑️</button>
            </div>
        </div>
    `).join('');
    
    // Auto-fill form with default address if exists
    const defaultAddr = getDefaultAddress();
    if (defaultAddr) {
        fillCheckoutForm(defaultAddr);
    }
}

// Select saved address
function selectSavedAddress(addressId) {
    const addresses = loadUserAddresses();
    const address = addresses.find(addr => addr.id === addressId);
    if (address) {
        fillCheckoutForm(address);
    }
}

// Fill checkout form with address data
function fillCheckoutForm(address) {
    const nameInput = document.getElementById('shippingName');
    const phoneInput = document.getElementById('shippingPhone');
    const addressInput = document.getElementById('shippingAddress');
    
    if (nameInput) nameInput.value = address.name || '';
    if (phoneInput) phoneInput.value = address.phone || '';
    if (addressInput) addressInput.value = address.address || '';
}

// Set address as default
function setAddressAsDefault(addressId) {
    setDefaultAddress(addressId);
    renderSavedAddresses();
}

// Delete address
function deleteAddress(addressId) {
    if (!confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
        return;
    }
    
    deleteUserAddress(addressId);
    renderSavedAddresses();
    
    // Clear form if deleted address was selected
    const selectedRadio = document.querySelector('input[name="selectedAddress"]:checked');
    if (!selectedRadio) {
        document.getElementById('checkoutForm').reset();
    }
}

// Save current form as new address
function saveCurrentAddressAsNew() {
    const nameInput = document.getElementById('shippingName');
    const phoneInput = document.getElementById('shippingPhone');
    const addressInput = document.getElementById('shippingAddress');
    
    if (!nameInput || !phoneInput || !addressInput) return;
    
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const address = addressInput.value.trim();
    
    if (!name || !phone || !address) {
        alert('Vui lòng điền đầy đủ thông tin địa chỉ trước khi lưu.');
        return;
    }
    
    if (!/^[0-9]{10,11}$/.test(phone)) {
        alert('Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số).');
        return;
    }
    
    const newAddress = {
        name,
        phone,
        address,
        isDefault: false
    };
    
    addUserAddress(newAddress);
    renderSavedAddresses();
    alert('Đã lưu địa chỉ thành công!');
}

// Toggle show/hide new address form
function toggleNewAddressForm() {
    const form = document.getElementById('newAddressForm');
    const savedList = document.getElementById('savedAddressesList');
    const toggleBtn = document.getElementById('toggleNewAddressBtn');
    
    if (!form || !toggleBtn) return;
    
    const isHidden = form.style.display === 'none' || !form.style.display;
    
    if (isHidden) {
        // Show new address form
        form.style.display = 'block';
        if (savedList) savedList.style.display = 'none';
        toggleBtn.textContent = '← Sử dụng địa chỉ đã lưu';
        // Uncheck all radio buttons
        const radios = document.querySelectorAll('input[name="selectedAddress"]');
        radios.forEach(radio => radio.checked = false);
        // Clear form
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) checkoutForm.reset();
    } else {
        // Show saved addresses
        form.style.display = 'none';
        if (savedList) savedList.style.display = 'block';
        toggleBtn.textContent = '+ Thêm địa chỉ mới';
        // Auto-select default address
        const defaultAddr = getDefaultAddress();
        if (defaultAddr) {
            const defaultRadio = document.getElementById(`address_${defaultAddr.id}`);
            if (defaultRadio) {
                defaultRadio.checked = true;
                fillCheckoutForm(defaultAddr);
            }
        }
    }
}

