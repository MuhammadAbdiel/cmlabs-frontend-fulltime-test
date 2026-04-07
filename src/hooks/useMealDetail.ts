'use client';

import { useEffect } from 'react';
import { useMealDetailStore } from '@/stores/useMealDetailStore';
import type { MealDetail } from '@/types/meal.types';
import type { ApiStatus } from '@/types/api.types';

interface UseMealDetailReturn {
  mealDetail: MealDetail | null;
  status: ApiStatus;
  error: string | null;
}

export function useMealDetail(mealId: string): UseMealDetailReturn {
  const fetchMealDetail = useMealDetailStore((s) => s.fetchMealDetail);
  const mealDetail = useMealDetailStore((s) => s.mealDetail);
  const status = useMealDetailStore((s) => s.status);
  const error = useMealDetailStore((s) => s.error);

  useEffect(() => {
    if (mealId) fetchMealDetail(mealId);
  }, [mealId, fetchMealDetail]);

  return { mealDetail, status, error };
}
