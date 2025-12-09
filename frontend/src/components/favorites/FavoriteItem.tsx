import React, { useCallback } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { FavoriteItem as FavoriteItemType } from '../../store/types';
import { useFavoriteStore } from '../../store/favoriteStore';
import { useCartStore } from '../../store/cartStore';

interface FavoriteItemProps {
  product: FavoriteItemType;
}

export const FavoriteItem: React.FC<FavoriteItemProps> = ({ product }) => {
  const { removeItem } = useFavoriteStore();
  const { addItem: addToCart } = useCartStore();

  const handleRemove = useCallback(() => {
    removeItem(product.id);
  }, [product.id, removeItem]);

  const handleAddToCart = useCallback(() => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }, [product, addToCart]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="group relative bg-white">
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleRemove}
          className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Remove from favorites"
        >
          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
        </button>
      </div>

      {/* Content */}
      <div>
        <p className="text-xs text-gray-600 uppercase tracking-wide mb-1 font-medium">
          {product.category}
        </p>

        <h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-semibold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          <ShoppingCart size={18} />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};
