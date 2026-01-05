// Navigation Functions

// Show home page (redirect to index.html)
function showHomePage(event) {
    if (event) event.preventDefault();
    window.location.href = 'index.html';
}

// Show products page (redirect to products.html)
function showProductsPage(event) {
    if (event) event.preventDefault();
    window.location.href = 'products.html';
}

// Show support page (redirect to support.html)
function showSupportPage(event) {
    if (event) event.preventDefault();
    window.location.href = 'support.html';
}

// Scroll to products section
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Perform hero search
function performHeroSearch() {
    const heroSearchInput = document.getElementById('heroSearchInput');
    const headerSearchInput = document.getElementById('searchInput');
    
    if (heroSearchInput && heroSearchInput.value.trim()) {
        if (headerSearchInput) {
            headerSearchInput.value = heroSearchInput.value;
        }
        showProductsPage(null);
        filterAndSortProducts();
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('mainNav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !nav.contains(event.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
}

