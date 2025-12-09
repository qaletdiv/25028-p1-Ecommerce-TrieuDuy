import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Search, ShoppingCart, Heart, Menu, X, User, MapPin, Zap, Sparkles, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onSearch: (query: string) => void;
  searchQuery: string;
  onNavigateHome?: () => void;
}

type MenuKey = 'featured' | 'men' | 'women' | 'kids' | 'sale';

// Custom hook để handle scroll WITHOUT re-render - ẨN HOÀN TOÀN taskbar
function useScrollAnimation(utilityBarRef: React.RefObject<HTMLDivElement>) {
  const rafRef = useRef<number | null>(null);
  const isHidden = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const shouldHide = scrollY > 10;

        // Chỉ update DOM nếu state thực sự thay đổi
        if (shouldHide !== isHidden.current) {
          isHidden.current = shouldHide;
          
          if (utilityBarRef.current) {
            // Update DOM trực tiếp, KHÔNG trigger re-render
            if (shouldHide) {
              // ẨN HOÀN TOÀN - không chừa khoảng trắng
              utilityBarRef.current.style.maxHeight = '0';
              utilityBarRef.current.style.opacity = '0';
              utilityBarRef.current.style.overflow = 'hidden';
            } else {
              // HIỆN LẠI
              utilityBarRef.current.style.maxHeight = '40px';
              utilityBarRef.current.style.opacity = '1';
              utilityBarRef.current.style.overflow = 'visible';
            }
          }
        }

        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []); // KHÔNG có dependency → chỉ setup 1 lần
}

// Utility Bar Component - KHÔNG có blur (chỉ header mới có)
const UtilityBar = memo(function UtilityBar({ 
  utilityBarRef,
  isDark, 
  onToggleDarkMode 
}: { 
  utilityBarRef: React.RefObject<HTMLDivElement>;
  isDark: boolean; 
  onToggleDarkMode: () => void;
}) {
  return (
    <div 
      ref={utilityBarRef}
      className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
      style={{ 
        height: '40px',
        maxHeight: '40px', // Để JS có thể set về 0
        opacity: 1,
        overflow: 'visible',
        transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out',
        willChange: 'max-height' // Animate max-height
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ height: '40px' }}>
        <div className="flex items-center justify-between h-full text-sm">
          {/* Left: Promotional Announcement */}
          <div className="flex items-center space-x-2 text-gray-900 dark:text-white">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-orange-50 dark:bg-orange-950 rounded-full border border-orange-200 dark:border-orange-800">
              <Zap className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs font-medium">Miễn Phí Vận Chuyển Đơn Từ 3,6 Triệu</span>
            </div>
            <div className="md:hidden flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs font-medium">Freeship 3,6tr+</span>
            </div>
          </div>

          {/* Right: Utility Links */}
          <div className="flex items-center space-x-1 text-xs text-gray-900 dark:text-white">
            <button className="px-2.5 py-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span className="hidden sm:inline">Tìm Cửa Hàng</span>
            </button>
            <span className="text-gray-400 dark:text-gray-500 hidden sm:inline">•</span>
            <button className="px-2.5 py-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors">Trợ Giúp</button>
            <span className="text-gray-400 dark:text-gray-500">•</span>
            <button className="px-2.5 py-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors">Tham Gia</button>
            <span className="text-gray-400 dark:text-gray-500">•</span>
            <button className="px-2.5 py-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>Đăng Nhập</span>
            </button>
            <span className="text-gray-400 dark:text-gray-500">•</span>
            <button className="px-2.5 py-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors" onClick={onToggleDarkMode}>
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// Navigation Component - Hover-intent để menu không tự đóng
const Navigation = memo(function Navigation({
  activeMenu,
  onSetActiveMenu
}: {
  activeMenu: MenuKey | null;
  onSetActiveMenu: (menu: MenuKey | null) => void;
}) {
  const handleMouseEnter = useCallback((menu: MenuKey) => {
    onSetActiveMenu(menu);
  }, [onSetActiveMenu]);

  const handleMouseLeave = useCallback(() => {
    onSetActiveMenu(null);
  }, [onSetActiveMenu]);

  return (
    <nav className="hidden md:flex items-center space-x-6">
      <div 
        className="relative py-4"
        onMouseEnter={() => handleMouseEnter('featured')}
        onMouseLeave={handleMouseLeave}
      >
        <a href="#" className="text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium px-2 py-2 block">Mới & Nổi Bật</a>
      </div>
      
      <div 
        className="relative py-4"
        onMouseEnter={() => handleMouseEnter('men')}
        onMouseLeave={handleMouseLeave}
      >
        <a href="#" className="text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium px-2 py-2 block">Nam</a>
      </div>

      <div 
        className="relative py-4"
        onMouseEnter={() => handleMouseEnter('women')}
        onMouseLeave={handleMouseLeave}
      >
        <a href="#" className="text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium px-2 py-2 block">Nữ</a>
      </div>

      <div 
        className="relative py-4"
        onMouseEnter={() => handleMouseEnter('kids')}
        onMouseLeave={handleMouseLeave}
      >
        <a href="#" className="text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium px-2 py-2 block">Trẻ Em</a>
      </div>

      <div 
        className="relative py-4"
        onMouseEnter={() => handleMouseEnter('sale')}
        onMouseLeave={handleMouseLeave}
      >
        <a href="#" className="text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium px-2 py-2 block">Giảm Giá</a>
      </div>
    </nav>
  );
});

// Props comparison function để memo chính xác hơn
function arePropsEqual(prevProps: HeaderProps, nextProps: HeaderProps) {
  return (
    prevProps.cartCount === nextProps.cartCount &&
    prevProps.searchQuery === nextProps.searchQuery &&
    prevProps.onSearch === nextProps.onSearch &&
    prevProps.onNavigateHome === nextProps.onNavigateHome
  );
}

export const Header = memo(function Header({ cartCount, onSearch, searchQuery, onNavigateHome }: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const utilityBarRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Custom hook xử lý scroll - KHÔNG tạo re-render
  useScrollAnimation(utilityBarRef);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Toggle dark mode - memoized để tránh tạo function mới
  const toggleDarkMode = useCallback(() => {
    setIsDark(prev => !prev);
    document.documentElement.classList.toggle('dark');
  }, []);

  // Hover-intent: Mở ngay, đóng có delay
  const handleSetActiveMenu = useCallback((menu: MenuKey | null) => {
    // Clear timeout cũ nếu có
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (menu === null) {
      // Delay 200ms trước khi đóng - cho phép di chuột xuống submenu
      closeTimeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, 200);
    } else {
      // Mở ngay lập tức
      setActiveMenu(menu);
    }
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  }, [onSearch]);

  const handleToggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <header 
      className="sticky top-0 z-50 border-b border-gray-200/30 dark:border-gray-800/30"
      style={{
        // KHÔI PHỤC blur - CHỈ Ở HEADER (1 layer duy nhất)
        backgroundColor: isDark ? 'rgba(3, 7, 18, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)', // Safari support
      }}
    >
      {/* Top Utility Bar - ẨN HOÀN TOÀN khi scroll */}
      <UtilityBar 
        utilityBarRef={utilityBarRef}
        isDark={isDark}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Header - KHÔNG có blur riêng */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ height: '64px', minHeight: '64px' }}>
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center" style={{ minWidth: '120px' }}>
            <button 
              onClick={onNavigateHome}
              className="flex items-center space-x-2 hover:opacity-70"
              style={{ transition: 'opacity 0.2s' }} // Inline transition tránh recalculate
            >
              <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '48px', height: '48px' }}>
                  <path d="M21.43 4.4C19.87 3.67 16.5 2 12 2 7.5 2 4.13 3.67 2.57 4.4c-.37.17-.57.54-.57.93v13.34c0 .6.48 1.08 1.08 1.08.19 0 .38-.05.55-.14C5.2 18.94 8.45 17.5 12 17.5c3.55 0 6.8 1.44 8.37 2.11.17.09.36.14.55.14.6 0 1.08-.48 1.08-1.08V5.33c0-.39-.2-.76-.57-.93z"/>
                </svg>
              </div>
              <span className="text-2xl tracking-tight hidden sm:block text-gray-900 dark:text-white">GayHub</span>
            </button>
          </div>

          {/* Desktop Navigation - Component tách riêng */}
          <Navigation 
            activeMenu={activeMenu}
            onSetActiveMenu={handleSetActiveMenu}
          />

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="hidden lg:block">
              <div className="relative" style={{ width: '192px' }}>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-full focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-700 text-sm"
                  style={{ 
                    transition: 'background-color 0.2s',
                    height: '40px' // Fixed height
                  }}
                />
                <Search className="absolute left-3 top-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" style={{ transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* Icons - Fixed sizes, no blur */}
            <button className="hidden md:block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-900 dark:text-white" style={{ transition: 'background-color 0.2s', width: '40px', height: '40px' }}>
              <Heart className="w-6 h-6" />
            </button>
            <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-900 dark:text-white" style={{ transition: 'background-color 0.2s', width: '40px', height: '40px' }}>
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-medium" style={{ width: '20px', height: '20px' }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-900 dark:text-white"
              onClick={handleToggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden" style={{ padding: '0 0 12px 0' }}>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-full focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-700 text-sm"
              style={{ 
                transition: 'background-color 0.2s',
                height: '40px'
              }}
            />
            <Search className="absolute left-3 top-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" style={{ transform: 'translateY(-50%)' }} />
          </div>
        </div>
      </div>

      {/* Mobile Menu - Bỏ blur, dùng background solid */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <nav className="px-4 py-4 space-y-3 text-gray-900 dark:text-white">
            <a href="#" className="block py-2 font-medium hover:text-orange-500 transition-colors">Mới & Nổi Bật</a>
            <a href="#" className="block py-2 font-medium hover:text-orange-500 transition-colors">Nam</a>
            <a href="#" className="block py-2 font-medium hover:text-orange-500 transition-colors">Nữ</a>
            <a href="#" className="block py-2 font-medium hover:text-orange-500 transition-colors">Trẻ Em</a>
            <a href="#" className="block py-2 font-medium hover:text-orange-500 transition-colors">Giảm Giá</a>
            <div className="pt-3 border-t border-gray-200/50 dark:border-gray-700/50 space-y-2">
              <a href="#" className="block py-2 hover:text-orange-500 transition-colors">Tìm Cửa Hàng</a>
              <a href="#" className="block py-2 hover:text-orange-500 transition-colors">Trợ Giúp</a>
              <a href="#" className="block py-2 hover:text-orange-500 transition-colors">Đăng Nhập</a>
            </div>
          </nav>
        </div>
      )}

      {/* Mega Menu Dropdowns - Hover-intent, không tự đóng sớm */}
      {activeMenu && (
        <div 
          className="hidden md:block absolute left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 animate-slideDown"
          style={{
            top: '100%', // Sát ngay dưới header
            marginTop: '-1px', // Overlap border để không có gap
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            willChange: 'transform, opacity'
          }}
          onMouseEnter={() => {
            // Vào dropdown - cancel timeout đóng
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
            setActiveMenu(activeMenu);
          }}
          onMouseLeave={() => {
            // Rời dropdown - đóng có delay
            handleSetActiveMenu(null);
          }}
        >
          <div className="max-w-7xl mx-auto px-8 pt-8 pb-12">
            {/* New & Featured Menu */}
            {activeMenu === 'featured' && (
              <div className="grid grid-cols-4 gap-12">
                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Nổi Bật</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Sản Phẩm Sắp Ra Mắt</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Hàng Mới Về</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Bán Chạy Nhất</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Lịch Ra Mắt</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Xu Hướng</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Sẵn Sàng Cho Mùa Đông</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Nhiều Màu Sắc Hơn</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Bộ Sưu Tập Cao Cấp</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Biểu Tượng</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Phong Cách Sống</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Chạy Bộ</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Bóng Rổ</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Theo Môn Thể Thao</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Chạy Bộ</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Bóng Rổ</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Bóng Đá</a></li>
                  </ul>
                </div>
              </div>
            )}

            {/* Men Menu */}
            {activeMenu === 'men' && (
              <div className="grid grid-cols-5 gap-8">
                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Nổi Bật</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Hàng Mới Về</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Bán Chạy Nhất</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Giày Dép</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Tất Cả Giày</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Phong Cách Sống</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Chạy Bộ</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Quần Áo</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Tất Cả Quần Áo</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Áo Thun & Áo Phông</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Theo Môn Thể Thao</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Chạy Bộ</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Bóng Rổ</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Phụ Kiện</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Túi & Balo</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Tất</a></li>
                  </ul>
                </div>
              </div>
            )}

            {/* Women Menu */}
            {activeMenu === 'women' && (
              <div className="grid grid-cols-5 gap-8">
                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Nổi Bật</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Hàng Mới Về</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Bán Chạy Nhất</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Giày Dép</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Tất Cả Giày</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Phong Cách Sống</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Quần Áo</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Tất Cả Quần Áo</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Áo Thể Thao</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Theo Môn Thể Thao</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Chạy Bộ</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Yoga</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Phụ Kiện</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Túi & Balo</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Tất</a></li>
                  </ul>
                </div>
              </div>
            )}

            {/* Kids Menu */}
            {activeMenu === 'kids' && (
              <div className="grid grid-cols-5 gap-8">
                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Nổi Bật</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Hàng Mới Về</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Bán Chạy Nhất</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Giày Dép</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Tất Cả Giày</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Phong Cách Sống</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Quần Áo</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Tất Cả Quần Áo</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Áo Thun & Áo Phông</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Theo Độ Tuổi</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Trẻ Lớn (7 - 14 tuổi)</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Trẻ Nhỏ (4 - 7 tuổi)</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Phụ Kiện</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Túi & Balo</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Tất</a></li>
                  </ul>
                </div>
              </div>
            )}

            {/* Sale Menu */}
            {activeMenu === 'sale' && (
              <div className="grid grid-cols-5 gap-8">
                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Ưu Đãi</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Tất Cả Giảm Giá</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Bán Chạy Nhất</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Giảm Giá Nam</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Giày</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Quần Áo</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Giảm Giá Nữ</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Giày</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Quần Áo</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Giảm Giá Trẻ Em</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Giày</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Quần Áo</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-gray-600 dark:text-gray-300 text-sm font-bold">Theo Môn Thể Thao</h4>
                  <ul className="space-y-2.5 text-sm">
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Bóng Đá</a></li>
                    <li><a href="#" className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Chạy Bộ</a></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}, arePropsEqual); // Custom comparison để chỉ re-render khi cần thiết
