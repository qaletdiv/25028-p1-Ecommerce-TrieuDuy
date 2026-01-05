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
    if (modal) modal.style.display = 'block';
    if (defaultTab) {
        switchAuthTab(defaultTab);
    }
    // Clear errors and hide success messages when opening modal
    clearAllErrors();
    hideSuccessMessage();
}

// Helper functions for error messages
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = message ? 'block' : 'none';
    }
    const inputElement = document.getElementById(fieldId);
    if (inputElement) {
        inputElement.classList.toggle('error', !!message);
    }
}

function clearError(fieldId) {
    showError(fieldId, '');
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    const inputElements = document.querySelectorAll('#authModal input');
    inputElements.forEach(el => el.classList.remove('error'));
}

// Helper functions for success messages
function showSuccessMessage(message, formType) {
    const successElement = document.getElementById(formType + 'SuccessMessage');
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
    }
}

function hideSuccessMessage() {
    const successElements = document.querySelectorAll('.success-message');
    successElements.forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Setup password visibility toggle
function togglePasswordVisibility(inputId, buttonElement) {
    const input = document.getElementById(inputId);
    const icon = buttonElement.querySelector('i');
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

// Setup auth form helpers (clear errors on input)
function setupAuthFormHelpers() {
    const inputs = document.querySelectorAll('#authModal input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const fieldId = this.id;
            clearError(fieldId);
        });
    });
}

function initAuth() {
    loadCurrentUser();
    updateAuthUI();
    // Setup form helpers when auth modal is available
    if (document.getElementById('authModal')) {
        setupAuthFormHelpers();
    }
}

// Switch auth tab
function switchAuthTab(tabName) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authTabs = document.querySelectorAll('.auth-tab');
    
    // Clear errors and hide success messages when switching tabs
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

    let hasError = false;

    // Validate email
    if (!email) {
        showError('loginEmail', 'Vui lòng nhập email.');
        hasError = true;
    } else if (!isValidEmail(email)) {
        showError('loginEmail', 'Email không hợp lệ.');
        hasError = true;
    }

    // Validate password
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
        showError('loginPassword', ''); // Clear password error if email is the main issue
        return;
    }
    
    setCurrentUser(user);
    showSuccessMessage('Đăng nhập thành công!', 'login');
    document.getElementById('loginFormElement').reset();

    // Close modal and redirect after showing success message
    setTimeout(() => {
        closeModal('authModal');
        hideSuccessMessage();
        
        // Redirect về trang trước đó (nếu có)
        if (lastRoute) {
            switch (lastRoute) {
                case 'checkout':
                    window.location.href = 'checkout.html';
                    break;
                case 'cart':
                    if (typeof cartManager !== 'undefined') {
                        cartManager.renderCart();
                        const cartModal = document.getElementById('cartModal');
                        if (cartModal) cartModal.style.display = 'block';
                    }
                    break;
                case 'account':
                    window.location.href = 'account.html';
                    break;
                case 'products':
                    window.location.href = 'products.html';
                    break;
                default:
                    break;
            }
            lastRoute = null;
        }
    }, 1500);
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

    let hasError = false;

    // Validate name
    if (!name) {
        showError('registerName', 'Vui lòng nhập họ và tên.');
        hasError = true;
    }

    // Validate email
    if (!email) {
        showError('registerEmail', 'Vui lòng nhập email.');
        hasError = true;
    } else if (!isValidEmail(email)) {
        showError('registerEmail', 'Email không hợp lệ.');
        hasError = true;
    }

    // Validate password
    if (!password) {
        showError('registerPassword', 'Vui lòng nhập mật khẩu.');
        hasError = true;
    } else if (password.length < 6) {
        showError('registerPassword', 'Mật khẩu phải có ít nhất 6 ký tự.');
        hasError = true;
    }

    // Validate confirm password
    if (!confirmPassword) {
        showError('registerConfirmPassword', 'Vui lòng nhập lại mật khẩu.');
        hasError = true;
    } else if (password !== confirmPassword) {
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
    
    showSuccessMessage('Đăng ký thành công! Đang chuyển đến form đăng nhập...', 'register');
    document.getElementById('registerFormElement').reset();

    // Switch to login tab after showing success message
    setTimeout(() => {
        hideSuccessMessage();
        switchAuthTab('login');
    }, 1500);
}

// Logout
function logout() {
    setCurrentUser(null);
    alert('Bạn đã đăng xuất.');
}


