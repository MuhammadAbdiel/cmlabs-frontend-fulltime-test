'use client';

import { SearchInput } from '@/components/atoms/SearchInput/SearchInput';
import { SkeletonCard } from '@/components/atoms/SkeletonCard/SkeletonCard';
import { IngredientCard } from '@/components/molecules/IngredientCard/IngredientCard';
import { useIngredients } from '@/hooks/useIngredients';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { UtensilsCrossed, Loader2 } from 'lucide-react';

const SKELETON_COUNT = 24;

export function IngredientGrid() {
  const { filteredIngredients, searchQuery, setSearch, status } = useIngredients();
  
  // Use client-side infinite scroll to chunk the rendering of over 500 ingredients
  const { visibleItems, loadMoreRef, hasMore } = useInfiniteScroll(filteredIngredients, 24);

  const isLoading = status === 'loading' || status === 'idle';
  const isEmpty = !isLoading && filteredIngredients.length === 0;

  return (
    <section className="space-y-6">
      {/* Search bar */}
      <SearchInput
        value={searchQuery}
        onChange={setSearch}
        placeholder="Search ingredients…"
        isLoading={isLoading}
        className="max-w-md"
      />

      {/* Empty state */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-24 text-zinc-500 gap-3">
          <UtensilsCrossed className="h-10 w-10 opacity-40" />
          <p className="text-sm">No ingredients found for &ldquo;{searchQuery}&rdquo;</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : visibleItems.map((ingredient) => (
              <IngredientCard key={ingredient.idIngredient} ingredient={ingredient} />
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

export default IngredientGrid;
