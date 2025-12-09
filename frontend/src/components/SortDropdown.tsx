import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { ChevronDown, ArrowUpDown, TrendingUp, TrendingDown, Star } from 'lucide-react';

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

interface SortDropdownProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  { value: 'relevance', label: 'Liên Quan', icon: <ArrowUpDown className="w-4 h-4" /> },
  { value: 'price-asc', label: 'Giá: Thấp Đến Cao', icon: <TrendingUp className="w-4 h-4" /> },
  { value: 'price-desc', label: 'Giá: Cao Đến Thấp', icon: <TrendingDown className="w-4 h-4" /> },
  { value: 'rating', label: 'Đánh Giá Cao Nhất', icon: <Star className="w-4 h-4" /> },
  { value: 'newest', label: 'Mới Nhất', icon: <ArrowUpDown className="w-4 h-4" /> }
];

export const SortDropdown = memo(function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(() => 
    sortOptions.find(opt => opt.value === value) || sortOptions[0],
    [value]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(prev => !prev);
      event.preventDefault();
    }
  }, []);

  const handleOptionSelect = useCallback((option: SortOption) => {
    onChange(option);
    setIsOpen(false);
  }, [onChange]);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm text-gray-900 dark:text-white font-medium mb-2">
        Sắp xếp theo
      </label>
      
      <button
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        className="w-full md:w-64 px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-between hover:border-gray-400 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          {selectedOption.icon}
          <span className="text-sm">{selectedOption.label}</span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div 
          className="absolute z-50 mt-2 w-full md:w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-200"
          role="listbox"
        >
          {sortOptions.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOptionSelect(option.value);
                  e.preventDefault();
                }
              }}
              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                index === 0 ? 'rounded-t-lg' : ''
              } ${
                index === sortOptions.length - 1 ? 'rounded-b-lg' : 'border-b border-gray-100 dark:border-gray-700'
              } ${
                option.value === value ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-200'
              }`}
              role="option"
              aria-selected={option.value === value}
            >
              <span className={option.value === value ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400'}>
                {option.icon}
              </span>
              <span className="text-sm">{option.label}</span>
              {option.value === value && (
                <span className="ml-auto">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
