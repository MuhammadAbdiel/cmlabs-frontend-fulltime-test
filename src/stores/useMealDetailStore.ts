import { create } from 'zustand';
import type { ApiStatus } from '@/types/api.types';
import type { MealDetail } from '@/types/meal.types';
import { getMealDetail } from '@/services/mealService';

interface MealDetailState {
  mealDetail: MealDetail | null;
  currentId: string;
  status: ApiStatus;
  error: string | null;

  // Actions
  fetchMealDetail: (mealId: string) => Promise<void>;
  reset: () => void;
}

const initialState = {
  mealDetail: null as MealDetail | null,
  currentId: '',
  status: 'idle' as ApiStatus,
  error: null as string | null,
};

export const useMealDetailStore = create<MealDetailState>((set, get) => ({
  ...initialState,

  fetchMealDetail: async (mealId) => {
    if (get().currentId === mealId && get().status === 'success') return;

    set({ status: 'loading', error: null, currentId: mealId });
    try {
      const data = await getMealDetail(mealId);
      if (!data) throw new Error('Meal not found.');
      set({ mealDetail: data, status: 'success' });
    } catch (err) {
      set({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to load meal detail.',
      });
    }
  },

  reset: () => set(initialState),
}));
