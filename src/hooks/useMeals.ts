'use client';

import { useEffect } from 'react';
import { useMealStore } from '@/stores/useMealStore';
import type { MealSummary } from '@/types/meal.types';
import type { ApiStatus } from '@/types/api.types';

interface UseMealsReturn {
  meals: MealSummary[];
  filteredMeals: MealSummary[];
  searchQuery: string;
  setSearch: (query: string) => void;
  status: ApiStatus;
  error: string | null;
}

export function useMeals(ingredientName: string): UseMealsReturn {
  const fetchMeals = useMealStore((s) => s.fetchMeals);
  const meals = useMealStore((s) => s.meals);
  const filteredMeals = useMealStore((s) => s.filteredMeals)();
  const searchQuery = useMealStore((s) => s.searchQuery);
  const setSearch = useMealStore((s) => s.setSearch);
  const status = useMealStore((s) => s.status);
  const error = useMealStore((s) => s.error);

  useEffect(() => {
    if (ingredientName) fetchMeals(ingredientName);
  }, [ingredientName, fetchMeals]);

  return { meals, filteredMeals, searchQuery, setSearch, status, error };
}
