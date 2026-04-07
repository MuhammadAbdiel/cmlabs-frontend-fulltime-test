'use client';

import { SearchInput } from '@/components/atoms/SearchInput/SearchInput';
import { SkeletonCard } from '@/components/atoms/SkeletonCard/SkeletonCard';
import { MealCard } from '@/components/molecules/MealCard/MealCard';
import { useMeals } from '@/hooks/useMeals';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { UtensilsCrossed, Loader2 } from 'lucide-react';

interface MealGridProps {
  ingredientName: string;
}

const SKELETON_COUNT = 12;

export function MealGrid({ ingredientName }: MealGridProps) {
  const { filteredMeals, searchQuery, setSearch, status } = useMeals(ingredientName);

  // Client-side pagination/infinite scroll for performance
  const { visibleItems, loadMoreRef, hasMore } = useInfiniteScroll(filteredMeals, 12);

  const isLoading = status === 'loading' || status === 'idle';
  const isEmpty = !isLoading && filteredMeals.length === 0;

  return (
    <section className="space-y-6">
      <SearchInput
        value={searchQuery}
        onChange={setSearch}
        placeholder="Search meals…"
        isLoading={isLoading}
        className="max-w-md"
      />

      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-24 text-zinc-500 gap-3">
          <UtensilsCrossed className="h-10 w-10 opacity-40" />
          <p className="text-sm">
            {searchQuery
              ? `No meals found for "${searchQuery}"`
              : `No meals found with ${ingredientName}`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : visibleItems.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
      </div>

      {/* Infinite Scroll Trigger */}
      {!isLoading && !isEmpty && hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        </div>
      )}
    </section>
  );
}

export default MealGrid;
