import React, { useCallback } from 'react';
import { X, Plus, Minus, Heart } from 'lucide-react';
import { CartItem as CartItemType } from '../../store/types';
import { useCartStore } from '../../store/cartStore';
import { useFavoriteStore } from '../../store/favoriteStore';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItem, updateQuantity } = useCartStore();
  const { toggleItem: toggleFavorite, isFavorite } = useFavoriteStore();

  const handleRemove = useCallback(() => {
    removeItem(item.id);
  }, [item.id, removeItem]);

  const handleIncreaseQuantity = useCallback(() => {
    updateQuantity(item.id, item.quantity + 1);
  }, [item.id, item.quantity, updateQuantity]);

  const handleDecreaseQuantity = useCallback(() => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  }, [item.id, item.quantity, updateQuantity]);

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: 'Giày', // Default category
      rating: 4.5,
    });
  }, [item, toggleFavorite]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const isInFavorites = isFavorite(item.id);

  return (
    <div className="flex gap-4 py-6 border-b border-gray-200 animate-in fade-in duration-300">
      {/* Image */}
      <div className="flex-shrink-0 w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between mb-2">
          <div className="flex-1 pr-4">
            <h3 className="text-base font-medium text-gray-900 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600">Giày Nam</p>
            {item.color && (
              <p className="text-sm text-gray-600">Màu: {item.color}</p>
            )}
            {item.size && (
              <p className="text-sm text-gray-600">Size: {item.size}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-base font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p>
          </div>
        </div>

        {/* Quantity & Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-300 rounded-full">
              <button
                onClick={handleDecreaseQuantity}
                disabled={item.quantity <= 1}
                className="p-2 hover:bg-gray-100 rounded-l-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-medium">{item.quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="p-2 hover:bg-gray-100 rounded-r-full transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Favorite Button */}
            <button
              onClick={handleToggleFavorite}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Add to favorites"
            >
              <Heart className={`w-5 h-5 ${isInFavorites ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>

            {/* Delete Button */}
            <button
              onClick={handleRemove}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Remove item"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
