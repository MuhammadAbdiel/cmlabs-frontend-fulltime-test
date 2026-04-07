'use client';

import { useEffect, useMemo } from 'react';
import { useIngredientStore } from '@/stores/useIngredientStore';
import type { Ingredient } from '@/types/ingredient.types';
import type { ApiStatus } from '@/types/api.types';

interface UseIngredientsReturn {
  ingredients: Ingredient[];
  filteredIngredients: Ingredient[];
  searchQuery: string;
  setSearch: (query: string) => void;
  status: ApiStatus;
  error: string | null;
}

export function useIngredients(): UseIngredientsReturn {
  const fetchIngredients = useIngredientStore((s) => s.fetchIngredients);
  const ingredients = useIngredientStore((s) => s.ingredients);
  const searchQuery = useIngredientStore((s) => s.searchQuery);
  
  const filteredIngredients = useMemo(() => {
    if (!searchQuery.trim()) return ingredients;
    const q = searchQuery.toLowerCase();
    return ingredients.filter((i) => i.strIngredient.toLowerCase().includes(q));
  }, [ingredients, searchQuery]);

  const setSearch = useIngredientStore((s) => s.setSearch);
  const status = useIngredientStore((s) => s.status);
  const error = useIngredientStore((s) => s.error);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  return { ingredients, filteredIngredients, searchQuery, setSearch, status, error };
}
