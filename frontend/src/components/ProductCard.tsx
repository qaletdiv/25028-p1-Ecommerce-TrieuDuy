import React, { useState, memo, useCallback, useMemo } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  category: string;
  image: string;
  description: string;
  isNew?: boolean;
  onSale?: boolean;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard = memo(function ProductCard({ product, isWishlisted, onAddToCart, onToggleWishlist }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = useMemo(() => 
    product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0,
    [product.originalPrice, product.price]
  );

  const reviewCount = useMemo(() => Math.floor(Math.random() * 500) + 50, []);

  const handleAddToCart = useCallback(() => {
    onAddToCart(product.id);
  }, [onAddToCart, product.id]);

  const handleToggleWishlist = useCallback(() => {
    onToggleWishlist(product.id);
  }, [onToggleWishlist, product.id]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-md">
            Mới
          </span>
        )}
        {product.onSale && discount > 0 && (
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-md">
            -{discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
      >
        <Heart 
          className={`w-5 h-5 transition-colors ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500 hover:text-red-500'
          }`}
        />
      </button>

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          onLoad={handleImageLoad}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 font-medium">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 h-12 text-gray-900 dark:text-white font-semibold">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-900 dark:text-white font-medium">{product.rating}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({reviewCount} đánh giá)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl text-gray-900 dark:text-white font-bold">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock */}
        {product.stock < 20 && product.stock > 0 && (
          <p className="text-xs text-orange-600 dark:text-orange-400 mb-3 font-medium">
            Chỉ còn {product.stock} sản phẩm!
          </p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-red-600 dark:text-red-400 mb-3 font-medium">
            Hết hàng
          </p>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed group-hover:shadow-lg font-medium"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{product.stock === 0 ? 'Hết Hàng' : 'Thêm Vào Giỏ'}</span>
        </button>
      </div>
    </div>
  );
});
