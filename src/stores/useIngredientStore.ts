import { create } from 'zustand';
import type { ApiStatus } from '@/types/api.types';
import type { Ingredient } from '@/types/ingredient.types';
import { getIngredients } from '@/services/mealService';

interface IngredientState {
  ingredients: Ingredient[];
  searchQuery: string;
  status: ApiStatus;
  error: string | null;

// Actions
  fetchIngredients: () => Promise<void>;
  setSearch: (query: string) => void;
  reset: () => void;
}

const initialState = {
  ingredients: [] as Ingredient[],
  searchQuery: '',
  status: 'idle' as ApiStatus,
  error: null as string | null,
};

export const useIngredientStore = create<IngredientState>((set, get) => ({
  ...initialState,

  fetchIngredients: async () => {
    // Prevent duplicate fetches
    if (get().status === 'loading' || get().status === 'success') return;

    set({ status: 'loading', error: null });
    try {
      const data = await getIngredients();
      set({ ingredients: data, status: 'success' });
    } catch (err) {
      set({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to load ingredients.',
      });
    }
  },

  setSearch: (query) => set({ searchQuery: query }),

  reset: () => set(initialState),
}));
