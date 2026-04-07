import { create } from 'zustand';
import type { ApiStatus } from '@/types/api.types';
import type { MealSummary } from '@/types/meal.types';
import { getMealsByIngredient } from '@/services/mealService';

interface MealState {
  meals: MealSummary[];
  currentIngredient: string;
  searchQuery: string;
  status: ApiStatus;
  error: string | null;

  // Derived
  filteredMeals: () => MealSummary[];

  // Actions
  fetchMeals: (ingredientName: string) => Promise<void>;
  setSearch: (query: string) => void;
  reset: () => void;
}

const initialState = {
  meals: [] as MealSummary[],
  currentIngredient: '',
  searchQuery: '',
  status: 'idle' as ApiStatus,
  error: null as string | null,
};

export const useMealStore = create<MealState>((set, get) => ({
  ...initialState,

  filteredMeals: () => {
    const { meals, searchQuery } = get();
    if (!searchQuery.trim()) return meals;
    const q = searchQuery.toLowerCase();
    return meals.filter((m) => m.strMeal.toLowerCase().includes(q));
  },

  fetchMeals: async (ingredientName) => {
    // Re-fetch only if ingredient changed
    const { currentIngredient, status } = get();
    if (currentIngredient === ingredientName && status === 'success') return;

    set({ status: 'loading', error: null, searchQuery: '', currentIngredient: ingredientName });
    try {
      const data = await getMealsByIngredient(ingredientName);
      set({ meals: data, status: 'success' });
    } catch (err) {
      set({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to load meals.',
      });
    }
  },

  setSearch: (query) => set({ searchQuery: query }),

  reset: () => set(initialState),
}));
