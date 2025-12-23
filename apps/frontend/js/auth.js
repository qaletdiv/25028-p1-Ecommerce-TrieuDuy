// Authentication & User Management

let currentUser = null;
let lastRoute = null; // lưu route gần nhất cần quay lại sau khi đăng nhập

function loadUsers() {
    const raw = localStorage.getItem('users');
    return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function loadCurrentUser() {
    const email = localStorage.getItem('currentUserEmail');
    if (!email) {
        currentUser = null;
        return;
    }
    const users = loadUsers();
    currentUser = users.find(u => u.email === email) || null;
}

function setCurrentUser(user) {
    currentUser = user;
    if (user) {
        localStorage.setItem('currentUserEmail', user.email);
    } else {
        localStorage.removeItem('currentUserEmail');
    }
    updateAuthUI();
}

function setLastRoute(route) {
    lastRoute = route;
}

function isUserLoggedIn() {
    return !!currentUser;
}

function getCurrentUser() {
    return currentUser;
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userDropdown = document.getElementById('userDropdown');
    const userMenuName = document.getElementById('userMenuName');

    if (isUserLoggedIn()) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userDropdown) userDropdown.style.display = 'block';
        if (userMenuName) userMenuName.textContent = currentUser?.name || 'Tài khoản';
    } else {
        if (loginBtn) {
            loginBtn.style.display = 'inline-block';
            loginBtn.textContent = 'Đăng nhập';
        }
        if (registerBtn) registerBtn.style.display = 'inline-block';
        if (userDropdown) userDropdown.style.display = 'none';
    }
}

function openAuthModal(defaultTab) {
    const modal = document.getElementById('authModal');
    if (modal) {
        clearAllErrors();
        hideSuccessMessage();
        modal.style.display = 'block';
    }
    if (defaultTab) {
        switchAuthTab(defaultTab);
    } else {
        switchAuthTab('login');
    }
}

function initAuth() {
    loadCurrentUser();
    updateAuthUI();
    setupAuthFormHelpers();
}

// Setup password toggle and form helpers
function setupAuthFormHelpers() {
    // Toggle password visibility
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
    const toggleRegisterConfirmPassword = document.getElementById('toggleRegisterConfirmPassword');
    
    if (toggleLoginPassword) {
        toggleLoginPassword.addEventListener('click', function() {
            togglePasswordVisibility('loginPassword', this);
        });
    }
    
    if (toggleRegisterPassword) {
        toggleRegisterPassword.addEventListener('click', function() {
            togglePasswordVisibility('registerPassword', this);
        });
    }
    
    if (toggleRegisterConfirmPassword) {
        toggleRegisterConfirmPassword.addEventListener('click', function() {
            togglePasswordVisibility('registerConfirmPassword', this);
        });
    }
    
    // Clear errors on input
    const inputs = document.querySelectorAll('#authModal input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearError(this.id);
            this.classList.remove('error');
            this.classList.add('success');
        });
    });
}

function togglePasswordVisibility(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(inputId + 'Error');
    
    if (input) {
        input.classList.remove('success');
        input.classList.add('error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(inputId + 'Error');
    
    if (input) {
        input.classList.remove('error');
    }
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
    
    const inputs = document.querySelectorAll('#authModal input');
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
}

function showSuccessMessage(message) {
    const successElement = document.getElementById('authSuccessMessage');
    const successText = document.getElementById('authSuccessText');
    
    if (successElement && successText) {
        successText.textContent = message;
        successElement.style.display = 'flex';
        
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 3000);
    }
}

function hideSuccessMessage() {
    const successElement = document.getElementById('authSuccessMessage');
    if (successElement) {
        successElement.style.display = 'none';
    }
}

// Switch auth tab
function switchAuthTab(tabName) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authTabs = document.querySelectorAll('.auth-tab');
    
    // Clear all errors and success message when switching tabs
    clearAllErrors();
    hideSuccessMessage();
    
    authTabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    if (tabName === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    clearAllErrors();
    hideSuccessMessage();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    // Validation
    let hasError = false;
    
    if (!email) {
        showError('loginEmail', 'Vui lòng nhập email.');
        hasError = true;
    } else if (!isValidEmail(email)) {
        showError('loginEmail', 'Email không hợp lệ.');
        hasError = true;
    }
    
    if (!password) {
        showError('loginPassword', 'Vui lòng nhập mật khẩu.');
        hasError = true;
    }
    
    if (hasError) {
        return;
    }
    
    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showError('loginEmail', 'Email hoặc mật khẩu không đúng.');
        showError('loginPassword', '');
        return;
    }
    
    setCurrentUser(user);
    showSuccessMessage('Đăng nhập thành công!');
    document.getElementById('loginFormElement').reset();
    
    setTimeout(() => {
        closeModal('authModal');
        hideSuccessMessage();
        
        // Redirect về trang trước đó (nếu có)
        if (lastRoute) {
            switch (lastRoute) {
                case 'checkout':
                    if (typeof goToCheckout === 'function') {
                        goToCheckout();
                    }
                    break;
                case 'cart':
                    if (typeof cartManager !== 'undefined') {
                        cartManager.renderCart();
                        const cartModal = document.getElementById('cartModal');
                        if (cartModal) cartModal.style.display = 'block';
                    }
                    break;
                case 'account':
                    if (typeof showAccountPage === 'function') {
                        showAccountPage(null);
                    }
                    break;
                case 'products':
                    if (typeof showProductsPage === 'function') {
                        showProductsPage(null);
                    }
                    break;
                default:
                    break;
            }
            lastRoute = null;
        }
    }, 1500);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Handle register
function handleRegister(event) {
    event.preventDefault();
    clearAllErrors();
    hideSuccessMessage();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
    
    // Validation
    let hasError = false;
    
    if (!name) {
        showError('registerName', 'Vui lòng nhập họ và tên.');
        hasError = true;
    } else if (name.length < 2) {
        showError('registerName', 'Họ và tên phải có ít nhất 2 ký tự.');
        hasError = true;
    }
    
    if (!email) {
        showError('registerEmail', 'Vui lòng nhập email.');
        hasError = true;
    } else if (!isValidEmail(email)) {
        showError('registerEmail', 'Email không hợp lệ.');
        hasError = true;
    }
    
    if (!password) {
        showError('registerPassword', 'Vui lòng nhập mật khẩu.');
        hasError = true;
    } else if (password.length < 6) {
        showError('registerPassword', 'Mật khẩu phải có ít nhất 6 ký tự.');
        hasError = true;
    }
    
    if (!confirmPassword) {
        showError('registerConfirmPassword', 'Vui lòng nhập lại mật khẩu.');
        hasError = true;
    } else if (password && password !== confirmPassword) {
        showError('registerConfirmPassword', 'Mật khẩu xác nhận không khớp.');
        hasError = true;
    }
    
    if (hasError) {
        return;
    }

    const users = loadUsers();
    const existing = users.find(u => u.email === email);
    if (existing) {
        showError('registerEmail', 'Email này đã được sử dụng. Vui lòng dùng email khác.');
        return;
    }

    const newUser = { name, email, password, orders: [], addresses: [] };
    users.push(newUser);
    saveUsers(users);
    
    showSuccessMessage('Đăng ký thành công! Vui lòng đăng nhập.');
    document.getElementById('registerFormElement').reset();
    
    setTimeout(() => {
        switchAuthTab('login');
        // Pre-fill email in login form
        document.getElementById('loginEmail').value = email;
        hideSuccessMessage();
    }, 1500);
}

// Logout
function logout() {
    setCurrentUser(null);
    alert('Bạn đã đăng xuất.');
}


