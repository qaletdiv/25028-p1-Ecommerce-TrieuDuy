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
    const userDropdownName = document.getElementById('userDropdownName');

    if (isUserLoggedIn()) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userDropdown) userDropdown.style.display = 'block';
        if (userDropdownName) userDropdownName.textContent = currentUser?.name || 'Tài khoản';
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
}

function initAuth() {
    loadCurrentUser();
    updateAuthUI();
}

// Switch auth tab
function switchAuthTab(tabName) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authTabs = document.querySelectorAll('.auth-tab');
    
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
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        alert('Email hoặc mật khẩu không đúng.');
        return;
    }
    
    setCurrentUser(user);
    alert('Đăng nhập thành công!');
    closeModal('authModal');
    document.getElementById('loginFormElement').reset();

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
}

// Handle register
function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
    
    // Simple validation
    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }
    
    if (!name || !email || !password) {
        alert('Vui lòng nhập đầy đủ thông tin.');
        return;
    }

    const users = loadUsers();
    const existing = users.find(u => u.email === email);
    if (existing) {
        alert('Email này đã được sử dụng. Vui lòng dùng email khác.');
        return;
    }

    const newUser = { name, email, password, orders: [] };
    users.push(newUser);
    saveUsers(users);
    
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    switchAuthTab('login');
    document.getElementById('registerFormElement').reset();
}

// Logout
function logout() {
    setCurrentUser(null);
    alert('Bạn đã đăng xuất.');
}


