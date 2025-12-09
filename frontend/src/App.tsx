import { useState, useEffect, useMemo, useCallback } from 'react';
import { Filter, Loader } from 'lucide-react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductCard, type Product } from './components/ProductCard';
import { FilterPanel, type FilterState } from './components/FilterPanel';
import { SortDropdown, type SortOption } from './components/SortDropdown';
import { Footer } from './components/Footer';
import { projectId, publicAnonKey } from './utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-44763aa1`;

// Use a consistent user ID for demo purposes
const USER_ID = 'demo-user-001';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalogue'>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<Array<{ productId: string; quantity: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 2000],
    minRating: 0
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
    fetchWishlist();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        console.error('Failed to fetch products:', data.error);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist/${USER_ID}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setWishlist(data.wishlist);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${USER_ID}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleAddToCart = useCallback(async (productId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${USER_ID}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity: 1 })
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
        // Show success feedback
        const product = products.find(p => p.id === productId);
        if (product) {
          alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
        }
      } else {
        console.error('Failed to add to cart:', data.error);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }, [products]);

  const handleToggleWishlist = useCallback(async (productId: string) => {
    const isWishlisted = wishlist.includes(productId);
    
    try {
      if (isWishlisted) {
        const response = await fetch(`${API_BASE_URL}/wishlist/${USER_ID}/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setWishlist(data.wishlist);
        }
      } else {
        const response = await fetch(`${API_BASE_URL}/wishlist/${USER_ID}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId })
        });
        const data = await response.json();
        if (data.success) {
          setWishlist(data.wishlist);
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  }, [wishlist]);

  const handleCategoryClick = useCallback((category: string) => {
    // Navigate to catalogue and set category filter
    setCurrentPage('catalogue');
    setFilters(prev => ({
      ...prev,
      categories: [category]
    }));
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateHome = useCallback(() => {
    setCurrentPage('home');
  }, []);

  const handleShopNow = useCallback(() => {
    setCurrentPage('catalogue');
  }, []);

  const handleCloseMobileFilters = useCallback(() => {
    setMobileFiltersOpen(false);
  }, []);

  const handleOpenMobileFilters = useCallback(() => {
    setMobileFiltersOpen(true);
  }, []);

  // Get available categories from products
  const availableCategories = useMemo(() => {
    const categories = new Set(products.map(p => p.category));
    return Array.from(categories).sort();
  }, [products]);

  // Filter, search, and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Apply price filter
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Apply rating filter
    if (filters.minRating > 0) {
      result = result.filter(product => product.rating >= filters.minRating);
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Relevance - default order
        break;
    }

    return result;
  }, [products, searchQuery, filters, sortOption]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-900 dark:text-white font-medium">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  // Show HomePage
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
        <Header 
          cartCount={cartItemCount}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          onNavigateHome={handleNavigateHome}
        />
        <HomePage 
          onShopNow={handleShopNow} 
          onCategoryClick={handleCategoryClick}
        />
        <Footer />
      </div>
    );
  }

  // Show Catalogue Page
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header 
        cartCount={cartItemCount}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        onNavigateHome={handleNavigateHome}
      />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                availableCategories={availableCategories}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl text-gray-900 dark:text-white mb-2 font-bold">
                  {searchQuery ? `Tìm kiếm: "${searchQuery}"` : 'Tất Cả Sản Phẩm'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {filteredAndSortedProducts.length} sản phẩm
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <button
                  onClick={handleOpenMobileFilters}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  <span className="text-sm font-medium">Bộ Lọc</span>
                </button>

                <SortDropdown value={sortOption} onChange={setSortOption} />
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-900 dark:text-white mb-2 font-medium">Không tìm thấy sản phẩm</p>
                <p className="text-gray-600 dark:text-gray-400">Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Filter Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleCloseMobileFilters}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl animate-in slide-in-from-right duration-300">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              availableCategories={availableCategories}
              isMobile
              onClose={handleCloseMobileFilters}
            />
          </div>
        </div>
      )}
    </div>
  );
}