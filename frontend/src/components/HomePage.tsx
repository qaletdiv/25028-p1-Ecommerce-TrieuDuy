import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

// Image component với error fallback
const ERROR_IMG_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);
  const { src, alt, className, style, ...rest } = props;

  if (didError) {
    return (
      <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`} style={style}>
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} />
        </div>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />;
}

interface HomePageProps {
  onShopNow: () => void;
  onCategoryClick?: (category: string) => void;
}

export const HomePage = memo(function HomePage({ onShopNow, onCategoryClick }: HomePageProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const iconSliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const SLIDE_INTERVAL = 5000; // 5 seconds

  const heroSlides = [
    {
      category: 'Giày Thể Thao',
      title: 'ĐẲNG CẤP TRONG TỪNG BƯỚC CHÂN',
      description: 'Khám phá giày thể thao cao cấp kết hợp phong cách, thoải mái và hiệu suất cho mỗi bước đi của bạn.',
      image: 'https://images.unsplash.com/photo-1608380272894-b3617f04b463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW5lcmljJTIwd2hpdGUlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NjUxMjcwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      category: 'Balo',
      title: 'MANG THEO THẾ GIỚI CỦA BẠN',
      description: 'Balo cao cấp được thiết kế cho lối sống hiện đại. Bền bỉ, phong cách và sẵn sàng cho mọi cuộc phiêu lưu.',
      image: 'https://images.unsplash.com/photo-1622560481979-f5b0174242a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMGJsYWNrJTIwYmFja3BhY2t8ZW58MXx8fHwxNzY1MTI3MDY3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      category: 'Áo Thun',
      title: 'THOẢI MÁI THUẦN KHIẾT',
      description: 'Áo thun thiết yếu được chế tác từ vật liệu cao cấp. Đơn giản, sạch sẽ và hoàn hảo cho trang phục hàng ngày.',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNpYyUyMHdoaXRlJTIwdHNoaXJ0fGVufDF8fHx8MTc2NTEyNzA2N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      category: 'Tất',
      title: 'NỀN TẢNG THOẢI MÁI',
      description: 'Tất thể thao cao cấp được thiết kế để tối ưu hiệu suất. Điểm chạm hoàn hảo cho mọi trang phục.',
      image: 'https://images.unsplash.com/photo-1561689644-cea27cce046c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGF0aGxldGljJTIwc29ja3N8ZW58MXx8fHwxNzY1MTI3MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      category: 'Áo Hoodie',
      title: 'BẢN CHẤT NÂNG TẦM',
      description: 'Áo hoodie ấm áp kết hợp sự thoải mái với phong cách đương đại. Lựa chọn hàng đầu cho vẻ thanh lịch thường ngày.',
      image: 'https://images.unsplash.com/photo-1657981190914-e7bc1cba612e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaG9vZGllfGVufDF8fHx8MTc2NTA4NzY1M3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      category: 'Túi Tote',
      title: 'BẠN ĐỒNG HÀNH HÀNG NGÀY',
      description: 'Túi tote đa năng kết hợp chức năng với thiết kế tối giản. Hoàn hảo cho mọi dịp.',
      image: 'https://images.unsplash.com/photo-1685270969384-9f0ff17d2193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW1wbGUlMjB0b3RlJTIwYmFnfGVufDF8fHx8MTc2NTEyNzA2OXww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  // Tối ưu auto-slide với RAF thay vì setInterval
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    lastUpdateRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - lastUpdateRef.current;

      if (elapsed >= SLIDE_INTERVAL) {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        lastUpdateRef.current = currentTime;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying, heroSlides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    lastUpdateRef.current = performance.now(); // Reset timer
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    lastUpdateRef.current = performance.now();
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    lastUpdateRef.current = performance.now();
  }, [heroSlides.length]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);


  return (
    <div className="min-h-screen">
      {/* Hero Carousel - Tối ưu GPU với transform */}
      <section className="relative h-screen overflow-hidden">
        {/* Slides Container */}
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className="absolute inset-0"
              style={{
                opacity: index === currentSlide ? 1 : 0,
                zIndex: index === currentSlide ? 10 : 0,
                transform: index === currentSlide ? 'scale3d(1, 1, 1)' : 'scale3d(1.05, 1.05, 1)',
                transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: index === currentSlide || index === (currentSlide + 1) % heroSlides.length ? 'opacity, transform' : 'auto'
              }}
            >
              {/* Background Image */}
              <ImageWithFallback
                src={slide.image}
                alt={slide.category}
                className="w-full h-full object-cover"
              />
              
              {/* Dark Overlay - BỎ backdrop-blur (nặng GPU) */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  {/* Category Badge */}
                  <div className="text-sm uppercase tracking-widest text-white/80 mb-6">
                    {slide.category}
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-6xl lg:text-8xl tracking-tight mb-6 text-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    {slide.title}
                  </h1>
                  
                  {/* Description */}
                  <p className="text-lg lg:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
                    {slide.description}
                  </p>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => onCategoryClick?.(slide.category)}
                      className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
                    >
                      Mua Ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Controls - Bottom Right - BỎ backdrop-blur */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-3">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 group"
            style={{ 
              transition: 'background-color 0.2s',
              backdropFilter: 'none' // Bỏ blur
            }}
            aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
          
          {/* Previous */}
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20"
            style={{ 
              transition: 'background-color 0.2s',
              backdropFilter: 'none'
            }}
            aria-label="Slide trước"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          
          {/* Next */}
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20"
            style={{ 
              transition: 'background-color 0.2s',
              backdropFilter: 'none'
            }}
            aria-label="Slide tiếp theo"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </section>

      {/* Featured - 4 Image Grid */}
      <section className="py-12 bg-white dark:bg-black">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl text-black dark:text-white mb-6 font-bold">Nổi Bật</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {/* Top Left - Outdoor/Snow */}
            <div className="relative aspect-[3/2] overflow-hidden group cursor-pointer">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759281946253-1e289a1bcc3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbm93JTIwbW91bnRhaW4lMjBvdXRkb29yJTIwZ2VhcnxlbnwxfHx8fDE3NjUxMjc4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Outdoor Gear"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 text-white">
                <button className="px-6 py-2 bg-white text-black rounded-full text-sm hover:bg-gray-100 transition-colors font-medium">
                  Mua Ngay
                </button>
              </div>
            </div>

            {/* Top Right - Shoe Closeup */}
            <div className="relative aspect-[3/2] overflow-hidden bg-black dark:bg-gray-900 group cursor-pointer">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1724934822176-320a7f9e1199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VyJTIwY2xvc2V1cCUyMGRldGFpbCUyMHByb2R1Y3R8ZW58MXx8fHwxNzY1MTI3ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Premium Sneaker"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div className="text-white">
                  <p className="text-sm mb-2">Bộ Sưu Tập Cao Cấp</p>
                  <h4 className="text-2xl mb-4 font-bold">Không Để Được Yêu Thích</h4>
                  <button className="px-6 py-2 bg-white text-black rounded-full text-sm hover:bg-gray-100 transition-colors font-medium">
                    Mua Ngay
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Left - Running */}
            <div className="relative aspect-[3/2] overflow-hidden group cursor-pointer">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1698678961439-413200c7ca9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwYXRobGV0ZSUyMHN0YWRpdW18ZW58MXx8fHwxNzY1MTI3ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Structure 26"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl mb-3 font-bold">Structure 26</h4>
                <button className="px-6 py-2 bg-white text-black rounded-full text-sm hover:bg-gray-100 transition-colors font-medium">
                  Mua Ngay
                </button>
              </div>
            </div>

            {/* Bottom Right - Tennis */}
            <div className="relative aspect-[3/2] overflow-hidden group cursor-pointer">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1761286753856-2f39b4413c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXIlMjBhY3Rpb258ZW58MXx8fHwxNzY1MTA5MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Tennis Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl mb-3 font-bold">Bộ Sưu Tập Tennis</h4>
                <button className="px-6 py-2 bg-white text-black rounded-full text-sm hover:bg-gray-100 transition-colors font-medium">
                  Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending - Single Product Hero */}
      <section className="py-12 bg-white dark:bg-black">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl text-black dark:text-white mb-6 font-bold">Xu Hướng</h3>
          <div className="relative bg-gray-50 dark:bg-gray-900 rounded-none overflow-hidden">
            <div className="aspect-[2/1] relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1724934822176-320a7f9e1199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VyJTIwY2xvc2V1cCUyMGRldGFpbCUyMHByb2R1Y3R8ZW58MXx8fHwxNzY1MTI3ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Trending Sneaker"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Classic Holiday Looks - Product Carousel */}
      <section className="py-12 bg-white dark:bg-black">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl text-black dark:text-white font-bold">Phong Cách Lễ Hội Cổ Điển</h3>
            <div className="flex items-center gap-4">
              <button className="text-sm text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 font-medium">Mua Ngay</button>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    if (sliderRef.current) {
                      sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                    }
                  }}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-black dark:text-white" />
                </button>
                <button 
                  onClick={() => {
                    if (sliderRef.current) {
                      sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                    }
                  }}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-black dark:text-white" />
                </button>
              </div>
            </div>
          </div>

          <div ref={sliderRef} className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Product 1 */}
            <div className="flex-shrink-0 w-80 min-w-[320px] group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-none overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1663693586817-f7e0ceb27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHNhbmRhbHMlMjBwcm9kdWN0fGVufDF8fHx8MTc2NTEyNzU3MHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Women's Sandals"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="text-base text-black dark:text-white mb-1">Dép Nữ Cao Cấp</h4>
                <p className="text-sm text-black/60 dark:text-white/60 mb-2">Phong Cách Mùa Hè Thoải Mái</p>
                <p className="text-black dark:text-white">2,649,000₫</p>
              </div>
            </div>

            {/* Product 2 */}
            <div className="flex-shrink-0 w-80 min-w-[320px] group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-none overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1673694103737-5fd09c9decdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGl2ZSUyMGdyZWVuJTIwc25lYWtlcnN8ZW58MXx8fHwxNzY1MTI3NTcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Reflective Sneakers"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="text-base text-black dark:text-white mb-1">Giày Phản Quang</h4>
                <p className="text-sm text-black/60 dark:text-white/60 mb-2">Thiết Kế Phản Quang Nổi Bật</p>
                <p className="text-black dark:text-white">3,829,000₫</p>
              </div>
            </div>

            {/* Product 3 */}
            <div className="flex-shrink-0 w-80 min-w-[320px] group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-none overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1588483947192-e416a1d10b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJndW5keSUyMGF0aGxldGljJTIwc2hvZXN8ZW58MXx8fHwxNzY1MTI3NTcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Athletic Shoes"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="text-base text-black dark:text-white mb-1">Giày Thể Thao Nữ</h4>
                <p className="text-sm text-black/60 dark:text-white/60 mb-2">Hiệu Suất Vận Động Cao</p>
                <p className="text-black dark:text-white">4,109,000₫</p>
              </div>
            </div>

            {/* Product 4 */}
            <div className="flex-shrink-0 w-80 min-w-[320px] group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-none overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1608380272894-b3617f04b463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW5lcmljJTIwd2hpdGUlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NjUxMjcwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Classic White Sneakers"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="text-base text-black dark:text-white mb-1">Giày Trắng Cổ Điển</h4>
                <p className="text-sm text-black/60 dark:text-white/60 mb-2">Giày Casual Cho Nữ</p>
                <p className="text-black dark:text-white">1,549,000₫</p>
              </div>
            </div>

            {/* Product 5 */}
            <div className="flex-shrink-0 w-80 min-w-[320px] group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-none overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBzbmVha2VyJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjUxMjc1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Red Sneakers"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="text-base text-black dark:text-white mb-1">Giày Đỏ Nổi Bật</h4>
                <p className="text-sm text-black/60 dark:text-white/60 mb-2">Màu Sắc Rực Rỡ, Cá Tính</p>
                <p className="text-black dark:text-white">3,299,000₫</p>
              </div>
            </div>

            {/* Product 6 */}
            <div className="flex-shrink-0 w-80 min-w-[320px] group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-none overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwc2hvZXN8ZW58MXx8fHwxNzY1MTI3NTc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Basketball Shoes"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="text-base text-black dark:text-white mb-1">Giày Bóng Rổ</h4>
                <p className="text-sm text-black/60 dark:text-white/60 mb-2">Hiệu Suất Cao Trên Sân</p>
                <p className="text-black dark:text-white">4,599,000₫</p>
              </div>
            </div>

            {/* Product 7 */}
            <div className="flex-shrink-0 w-80 min-w-[320px] group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-none overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHNuZWFrZXIlMjBwcm9kdWN0fGVufDF8fHx8MTc2NTEyNzU3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Black Sneakers"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="text-base text-black dark:text-white mb-1">Giày Đen Sang Trọng</h4>
                <p className="text-sm text-black/60 dark:text-white/60 mb-2">Thiết Kế Tối Giản, Thanh Lịch</p>
                <p className="text-black dark:text-white">3,799,000₫</p>
              </div>
            </div>

            {/* Product 8 */}
            <div className="flex-shrink-0 w-80 min-w-[320px] group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-none overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBwcm9kdWN0fGVufDF8fHx8MTc2NTEyNzU3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Running Shoes"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="text-base text-black dark:text-white mb-1">Giày Chạy Bộ</h4>
                <p className="text-sm text-black/60 dark:text-white/60 mb-2">Đệm Êm, Nhẹ Nhàng</p>
                <p className="text-black dark:text-white">3,499,000₫</p>
              </div>
            </div>

            {/* Product 9 */}
            <div className="flex-shrink-0 w-80 min-w-[320px] group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-none overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJ8ZW58MXx8fHwxNzY1MTI3NTc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="White Classic"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="text-base text-black dark:text-white mb-1">Giày Trắng Đế Bệt</h4>
                <p className="text-sm text-black/60 dark:text-white/60 mb-2">Phong Cách Trẻ Trung</p>
                <p className="text-black dark:text-white">2,899,000₫</p>
              </div>
            </div>

            {/* Product 10 */}
            <div className="flex-shrink-0 w-80 min-w-[320px] group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-none overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1562183241-b937e95585b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbmluZyUyMHNob2VzfGVufDF8fHx8MTc2NTEyNzU3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Training Shoes"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="text-base text-black dark:text-white mb-1">Giày Tập Gym</h4>
                <p className="text-sm text-black/60 dark:text-white/60 mb-2">Hỗ Trợ Tối Đa Khi Tập Luyện</p>
                <p className="text-black dark:text-white">3,199,000₫</p>
              </div>
            </div>

            {/* Product 11 */}
            <div className="flex-shrink-0 w-80 min-w-[320px] group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-none overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1539185441755-769473a23570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBzbmVha2VyfGVufDF8fHx8MTc2NTEyNzU3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Lifestyle Sneaker"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="text-base text-black dark:text-white mb-1">Giày Lifestyle</h4>
                <p className="text-sm text-black/60 dark:text-white/60 mb-2">Phong Cách Đời Thường</p>
                <p className="text-black dark:text-white">2,999,000₫</p>
              </div>
            </div>

            {/* Product 12 */}
            <div className="flex-shrink-0 w-80 min-w-[320px] group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 rounded-none overflow-hidden mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1700407592504-f4de855d559a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhbSUyMHdoaXRlJTIwc25lYWtlcnxlbnwxfHx8fDE3NjUxMjc1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Cream White"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="text-base text-black dark:text-white mb-1">Giày Kem Nhẹ Nhàng</h4>
                <p className="text-sm text-black/60 dark:text-white/60 mb-2">Màu Sắc Dịu Dàng, Dễ Phối</p>
                <p className="text-black dark:text-white">2,799,000₫</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Sport - Lifestyle Images */}
      <section className="py-12 bg-white dark:bg-black">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl text-black dark:text-white font-bold">Mua Theo Môn Thể Thao</h3>
            <div className="flex gap-2">
              <button 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-black dark:text-white" />
              </button>
              <button 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-black dark:text-white" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Basketball */}
            <div className="group cursor-pointer" onClick={() => onCategoryClick?.('Basketball')}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-none mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1762025930827-9f1dda45aff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwYWN0aW9ufGVufDF8fHx8MTc2NTA1NjczNHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Basketball"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h4 className="text-lg text-black dark:text-white">Basketball</h4>
            </div>

            {/* Football */}
            <div className="group cursor-pointer" onClick={() => onCategoryClick?.('Football')}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-none mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1616702678549-849defb252a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBwbGF5ZXIlMjB5ZWxsb3clMjBqZXJzZXl8ZW58MXx8fHwxNzY1MDQ4MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Football"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h4 className="text-lg text-black dark:text-white">Football</h4>
            </div>

            {/* Running */}
            <div className="group cursor-pointer" onClick={() => onCategoryClick?.('Running')}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-none mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1646678943074-f987372f6fec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHJ1bm5pbmclMjB1cmJhbnxlbnwxfHx8fDE3NjUxMjc1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Running"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h4 className="text-lg text-black dark:text-white">Running</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Icons - Horizontal Scroll */}
      <section className="pt-12 bg-white dark:bg-black">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl text-black dark:text-white mb-6 font-bold">Mua Theo Biểu Tượng</h3>
          
          <div className="relative">
            {/* Global Navigation Buttons */}
            <button 
              onClick={() => {
                if (iconSliderRef.current) {
                  iconSliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                }
              }}
              className="absolute left-4 top-3 z-20 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:flex"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-black dark:text-white" />
            </button>
            <button 
              onClick={() => {
                if (iconSliderRef.current) {
                  iconSliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                }
              }}
              className="absolute right-4 top-3 z-20 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:flex"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-black dark:text-white" />
            </button>

            <div ref={iconSliderRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* Icon 1 - Blazer */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1662037131816-aa2d7245166c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGhpZ2glMjB0b3AlMjBzbmVha2VyfGVufDF8fHx8MTc2NTEyNzU3NHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Blazer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Blazer</p>
              </div>

              {/* Icon 2 - Dunk */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1596541206585-baf54189ae29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGxlYXRoZXIlMjBzbmVha2VyfGVufDF8fHx8MTc2NTEyNzU3NHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Dunk"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Dunk</p>
              </div>

              {/* Icon 3 - Killshot */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1603890611265-31533626a6fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHJ1bm5pbmclMjBzaG9lcyUyMGNsb3NldXB8ZW58MXx8fHwxNjUxMjc0NTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Killshot"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Killshot</p>
              </div>

              {/* Icon 4 - Cortez */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1724606256769-487cbbd6fdf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW4lMjBiZWlnZSUyMHNuZWFrZXJ8ZW58MXx8fHwxNzY1MTI3NTc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Cortez"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Cortez</p>
              </div>

              {/* Icon 5 - High-Top Sneakers */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1700407592504-f4de855d559a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhbSUyMHdoaXRlJTIwc25lYWtlcnxlbnwxfHx8fDE3NjUxMjc1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="High-Top Sneakers"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">High-Top</p>
              </div>

              {/* Icon 6 - Classic Low */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1596541206585-baf54189ae29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGxlYXRoZXIlMjBzbmVha2VyfGVufDF8fHx8MTc2NTEyNzU3NHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Classic Low"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Classic Low</p>
              </div>

              {/* Icon 7 - Performance */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXIlMjBwcm9kdWN0JTIwcGhvdG98ZW58MXx8fHwxNzY1MTI3NDU2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Performance"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Performance</p>
              </div>

              {/* Icon 8 - Air Max */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBzbmVha2VyJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjUxMjc1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Air Max"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Air Max</p>
              </div>

              {/* Icon 9 - Air Force 1 */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJ8ZW58MXx8fHwxNzY1MTI3NTc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Air Force 1"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Air Force 1</p>
              </div>

              {/* Icon 10 - Jordan */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHNuZWFrZXIlMjBwcm9kdWN0fGVufDF8fHx8MTc2NTEyNzU3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Jordan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Jordan</p>
              </div>

              {/* Icon 11 - Running */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1556906781-9a412961c28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBwcm9kdWN0fGVufDF8fHx8MTc2NTEyNzU3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Running"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Running</p>
              </div>

              {/* Icon 12 - Basketball */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwc2hvZXN8ZW58MXx8fHwxNzY1MTI3NTc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Basketball"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Basketball</p>
              </div>

              {/* Icon 13 - Slides */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1603487742131-4160ec999306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGlkZXMlMjBzYW5kYWxzfGVufDF8fHx8MTc2NTEyNzU3OHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Slides"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Slides</p>
              </div>

              {/* Icon 14 - Training */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1562183241-b937e95585b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbmluZyUyMHNob2VzfGVufDF8fHx8MTc2NTEyNzU3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Training"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Training</p>
              </div>

              {/* Icon 15 - Lifestyle */}
              <div className="flex-shrink-0 w-40 min-w-[160px] group cursor-pointer">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1539185441755-769473a23570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBzbmVha2VyfGVufDF8fHx8MTc2NTEyNzU3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Lifestyle"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm text-black dark:text-white">Lifestyle</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});