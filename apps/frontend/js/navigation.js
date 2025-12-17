// Navigation Functions

// Show home page (show all sections)
function showHomePage(event) {
    if (event) event.preventDefault();
    
    const heroCarousel = document.querySelector('.hero-carousel');
    const signatureSection = document.querySelector('.signature-section');
    const featured = document.getElementById('featured');
    const rotationSection = document.querySelector('.sneaker-rotation-section');
    const iconsSection = document.querySelector('.shop-by-icons-section');
    const promoBanners = document.querySelector('.promo-banners');
    const latest = document.getElementById('latest');
    const products = document.getElementById('products');
    const suggested = document.querySelector('.suggested-section');
    const support = document.getElementById('support');
    const checkout = document.getElementById('checkout');
    const orderConfirmation = document.getElementById('orderConfirmation');
    const account = document.getElementById('account');
    
    // Show sections for home page
    if (heroCarousel) heroCarousel.style.display = 'block';
    if (signatureSection) signatureSection.style.display = 'block';
    if (featured) featured.style.display = 'block';
    if (rotationSection) rotationSection.style.display = 'block';
    if (iconsSection) iconsSection.style.display = 'block';
    if (promoBanners) promoBanners.style.display = 'block';
    
    // Hide all sections from "Tất cả sản phẩm" downwards
    if (latest) latest.style.display = 'none';
    if (products) products.style.display = 'none';
    if (suggested) suggested.style.display = 'none';
    if (support) support.style.display = 'none';
    if (checkout) checkout.style.display = 'none';
    if (orderConfirmation) orderConfirmation.style.display = 'none';
    if (account) account.style.display = 'none';
    
    // Update active nav
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const homeLink = document.querySelector('.nav-link[onclick*="showHomePage"]');
    if (homeLink) homeLink.classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show products page (hide hero/featured/latest, show only all products)
function showProductsPage(event) {
    if (event) event.preventDefault();
    
    const heroCarousel = document.querySelector('.hero-carousel');
    const featured = document.getElementById('featured');
    const rotationSection = document.querySelector('.sneaker-rotation-section');
    const iconsSection = document.querySelector('.shop-by-icons-section');
    const promoBanners = document.querySelector('.promo-banners');
    const latest = document.getElementById('latest');
    const products = document.getElementById('products');
    const suggested = document.querySelector('.suggested-section');
    const support = document.getElementById('support');
    const checkout = document.getElementById('checkout');
    const orderConfirmation = document.getElementById('orderConfirmation');
    const account = document.getElementById('account');
    
    if (heroCarousel) heroCarousel.style.display = 'none';
    if (featured) featured.style.display = 'none';
    if (rotationSection) rotationSection.style.display = 'none';
    if (iconsSection) iconsSection.style.display = 'none';
    if (promoBanners) promoBanners.style.display = 'none';
    if (latest) latest.style.display = 'none';
    if (products) products.style.display = 'block';
    if (suggested) suggested.style.display = 'none';
    if (support) support.style.display = 'none';
    if (checkout) checkout.style.display = 'none';
    if (orderConfirmation) orderConfirmation.style.display = 'none';
    if (account) account.style.display = 'none';
    
    // Update active nav
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const productsLink = document.querySelector('.nav-link[onclick*="showProductsPage"]');
    if (productsLink) productsLink.classList.add('active');
    
    // Scroll to top to show products section with filter bar
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show support page
function showSupportPage(event) {
    if (event) event.preventDefault();
    
    const heroCarousel = document.querySelector('.hero-carousel');
    const featured = document.getElementById('featured');
    const rotationSection = document.querySelector('.sneaker-rotation-section');
    const iconsSection = document.querySelector('.shop-by-icons-section');
    const promoBanners = document.querySelector('.promo-banners');
    const latest = document.getElementById('latest');
    const products = document.getElementById('products');
    const suggested = document.querySelector('.suggested-section');
    const support = document.getElementById('support');
    const checkout = document.getElementById('checkout');
    const orderConfirmation = document.getElementById('orderConfirmation');
    const account = document.getElementById('account');
    
    if (heroCarousel) heroCarousel.style.display = 'none';
    if (featured) featured.style.display = 'none';
    if (rotationSection) rotationSection.style.display = 'none';
    if (iconsSection) iconsSection.style.display = 'none';
    if (promoBanners) promoBanners.style.display = 'none';
    if (latest) latest.style.display = 'none';
    if (products) products.style.display = 'none';
    if (suggested) suggested.style.display = 'none';
    if (support) support.style.display = 'block';
    if (checkout) checkout.style.display = 'none';
    if (orderConfirmation) orderConfirmation.style.display = 'none';
    if (account) account.style.display = 'none';
    
    // Update active nav
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const supportLink = document.querySelector('.nav-link[onclick*="showSupportPage"]');
    if (supportLink) supportLink.classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

