import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FavoriteItem } from './types';

interface FavoriteStore {
  items: FavoriteItem[];
  addItem: (item: FavoriteItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  getItemCount: () => number;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id);
          if (exists) return state;
          return { items: [...state.items, item] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      toggleItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id);
          if (exists) {
            return { items: state.items.filter((i) => i.id !== item.id) };
          }
          return { items: [...state.items, item] };
        }),

      isFavorite: (id) => {
        const { items } = get();
        return items.some((item) => item.id === id);
      },

      getItemCount: () => {
        const { items } = get();
        return items.length;
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
