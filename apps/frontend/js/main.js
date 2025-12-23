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
    
    // Render initial products
    initCarousel();
    initFeaturedProductsFullWidth();
    initRotationProducts();
    initShopByIcons();
    initLatestProducts();
    filterAndSortProducts();
    initSuggestedProducts();
    initPromoBanners();
    
    // Setup event listeners
    setupEventListeners();
    initMobileMenu();
    
    // Hide sections that should not show on home page initially
    const latest = document.getElementById('latest');
    const products = document.getElementById('products');
    const suggested = document.querySelector('.suggested-section');
    const support = document.getElementById('support');
    
    if (latest) latest.style.display = 'none';
    if (products) products.style.display = 'none';
    if (suggested) suggested.style.display = 'none';
    if (support) support.style.display = 'none';
});

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
            if (typeof showProductsPage === 'function') {
                showProductsPage(null);
            }
            filterAndSortProducts();
            // Scroll to products section
            setTimeout(() => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
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

