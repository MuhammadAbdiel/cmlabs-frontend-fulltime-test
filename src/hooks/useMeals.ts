'use client';

import { useEffect, useMemo } from 'react';
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
  const searchQuery = useMealStore((s) => s.searchQuery);
  
  const filteredMeals = useMemo(() => {
    if (!searchQuery.trim()) return meals;
    const q = searchQuery.toLowerCase();
    return meals.filter((m) => m.strMeal.toLowerCase().includes(q));
  }, [meals, searchQuery]);

  const setSearch = useMealStore((s) => s.setSearch);
  const status = useMealStore((s) => s.status);
  const error = useMealStore((s) => s.error);

  useEffect(() => {
    if (ingredientName) fetchMeals(ingredientName);
  }, [ingredientName, fetchMeals]);

  return { meals, filteredMeals, searchQuery, setSearch, status, error };
}
