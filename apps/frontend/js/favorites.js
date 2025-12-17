// Favorites Manager
const favoritesManager = {
    favorites: [],
    
    // Load favorites from localStorage
    init() {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            this.favorites = JSON.parse(savedFavorites);
        }
        this.updateFavoritesUI();
    },
    
    // Save favorites to localStorage
    save() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.updateFavoritesUI();
    },
    
    // Toggle favorite
    toggleFavorite(productId) {
        const index = this.favorites.indexOf(productId);
        
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(productId);
        }
        
        this.save();
        this.updateProductCards();
    },
    
    // Check if product is favorite
    isFavorite(productId) {
        return this.favorites.includes(productId);
    },
    
    // Update favorites UI (count badge)
    updateFavoritesUI() {
        const favoritesCount = document.getElementById('favoritesCount');
        if (favoritesCount) {
            favoritesCount.textContent = this.favorites.length;
        }
    },
    
    // Update product cards (refresh favorite icons)
    updateProductCards() {
        // Re-render all product sections to update favorite icons
        initFeaturedProducts();
        initLatestProducts();
        filterAndSortProducts();
        initSuggestedProducts();
    },
    
    // Render favorites modal
    renderFavorites() {
        const favoritesItems = document.getElementById('favoritesItems');
        if (!favoritesItems) return;
        
        if (this.favorites.length === 0) {
            favoritesItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #7f8c8d;">Chưa có sản phẩm yêu thích</p>';
            return;
        }
        
        const favoriteProducts = this.favorites.map(id => getProductById(id)).filter(p => p);
        favoritesItems.innerHTML = favoriteProducts.map(product => renderProductCard(product)).join('');
        
        // Add click event to product cards
        favoritesItems.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function() {
                const productId = parseInt(this.dataset.productId);
                showProductModal(productId);
            });
        });
    }
};

