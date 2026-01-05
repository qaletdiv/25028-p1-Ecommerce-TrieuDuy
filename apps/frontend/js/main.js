// Main Application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode first (if not already initialized)
    if (typeof initDarkMode === 'function' && typeof setupDarkModeToggle === 'function') {
        initDarkMode();
        setupDarkModeToggle();
    }
    
    // Initialize auth & managers
    initAuth();
    cartManager.init();
    favoritesManager.init();
    
    // Set active nav link based on current page
    setActiveNavLink();
    
    // Get current page from window.location
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Initialize components based on current page
    if (currentPage === 'index.html' || currentPage === '' || currentPage === 'index.html' || !currentPage.includes('.')) {
        // Home page - render all home sections
        initCarousel();
        initFeaturedProductsFullWidth();
        initRotationProducts();
        initShopByIcons();
        initLatestProducts();
        initSuggestedProducts();
        initPromoBanners();
        
        // Hide sections that should not show on home page initially
        const latest = document.getElementById('latest');
        const products = document.getElementById('products');
        const suggested = document.querySelector('.suggested-section');
        const support = document.getElementById('support');
        
        if (latest) latest.style.display = 'none';
        if (products) products.style.display = 'none';
        if (suggested) suggested.style.display = 'none';
        if (support) support.style.display = 'none';
    } else if (currentPage === 'products.html') {
        // Products page - initialize products filter and render
        filterAndSortProducts();
    } else if (currentPage === 'checkout.html') {
        // Checkout page - render checkout summary and saved addresses
        if (typeof renderCheckoutSummary === 'function') {
            renderCheckoutSummary();
        }
        if (typeof renderSavedAddresses === 'function') {
            renderSavedAddresses();
        }
        
        // Check if there's a pending order confirmation
        const lastOrder = sessionStorage.getItem('lastOrder');
        if (lastOrder) {
            try {
                const order = JSON.parse(lastOrder);
                showOrderConfirmationPage(order);
                sessionStorage.removeItem('lastOrder');
            } catch (e) {
                console.error('Error parsing last order:', e);
            }
        }
    } else if (currentPage === 'account.html') {
        // Account page - render account page
        if (typeof renderAccountPage === 'function') {
            renderAccountPage();
        }
    }
    
    // Setup event listeners (always needed)
    setupEventListeners();
    initMobileMenu();
});

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentPage === 'index.html' || currentPage === '' || !currentPage.includes('.')) {
            if (href === 'index.html' || href === '#') {
                link.classList.add('active');
            }
        } else if (currentPage === 'products.html' && href === 'products.html') {
            link.classList.add('active');
        } else if (currentPage === 'support.html' && href === 'support.html') {
            link.classList.add('active');
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Header search input
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        // Search khi gõ (real-time)
        searchInput.addEventListener('input', filterAndSortProducts);
        
        // Search khi nhấn Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
    
    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
    }
    
    // Function to perform search
    function performSearch() {
        const searchValue = searchInput?.value.trim();
        if (searchValue) {
            // Add to search history if function exists
            if (typeof addToSearchHistory === 'function') {
                addToSearchHistory(searchValue);
            }
            // Chuyển đến trang sản phẩm nếu đang ở trang khác
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            if (currentPage !== 'products.html') {
                window.location.href = 'products.html';
                return;
            }
            filterAndSortProducts();
        }
    }
    
    // Hero search input
    const heroSearchInput = document.getElementById('heroSearchInput');
    if (heroSearchInput) {
        heroSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performHeroSearch();
            }
        });
    }
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndSortProducts);
    }
    
    // Price filters
    const minPriceFilter = document.getElementById('minPriceFilter');
    const maxPriceFilter = document.getElementById('maxPriceFilter');
    if (minPriceFilter) {
        minPriceFilter.addEventListener('input', filterAndSortProducts);
    }
    if (maxPriceFilter) {
        maxPriceFilter.addEventListener('input', filterAndSortProducts);
    }
    
    // Rating filter
    const minRatingFilter = document.getElementById('minRatingFilter');
    if (minRatingFilter) {
        minRatingFilter.addEventListener('change', filterAndSortProducts);
    }
    
    // Sort filter
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', filterAndSortProducts);
    }
    
    // Cart button (yêu cầu đăng nhập)
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            if (!isUserLoggedIn || !isUserLoggedIn()) {
                if (typeof setLastRoute === 'function') {
                    setLastRoute('cart');
                }
                alert('Vui lòng đăng nhập để xem giỏ hàng.');
                openAuthModal('login');
                return;
            }
            cartManager.renderCart();
            document.getElementById('cartModal').style.display = 'block';
        });
    }
    
    // Favorites button
    const favoritesBtn = document.getElementById('favoritesBtn');
    if (favoritesBtn) {
        favoritesBtn.addEventListener('click', function() {
            favoritesManager.renderFavorites();
            document.getElementById('favoritesModal').style.display = 'block';
        });
    }
    
    // Login button
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            openAuthModal('login');
        });
    }

    // Register button
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            openAuthModal('register');
        });
    }

    // User dropdown toggle
    const userDropdown = document.getElementById('userDropdown');
    const userDropdownToggle = document.getElementById('userDropdownToggle');
    if (userDropdown && userDropdownToggle) {
        userDropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('open');
        });
        // click outside to close
        document.addEventListener('click', function() {
            userDropdown.classList.remove('open');
        });
    }

    // Auth tabs
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchAuthTab(tabName);
        });
    });
    
    // Modal close buttons
    setupModalClose();
}

// Setup modal close functionality
function setupModalClose() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Close modal helper
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Scroll to products section
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Toggle FAQ item
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const faqIcon = element.querySelector('.faq-icon');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-icon').textContent = '+';
        }
    });
    
    // Toggle current FAQ item
    if (isActive) {
        faqItem.classList.remove('active');
        faqIcon.textContent = '+';
    } else {
        faqItem.classList.add('active');
        faqIcon.textContent = '−';
    }
}

