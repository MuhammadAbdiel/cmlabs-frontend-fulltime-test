import { Suspense } from 'react';
import { IngredientGrid } from '@/components/organisms/IngredientGrid/IngredientGrid';
import { SkeletonCard } from '@/components/atoms/SkeletonCard/SkeletonCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ingredients — Browse All',
  description: 'Explore all ingredients and find meals you can make with them.',
};

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
      {Array.from({ length: 24 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default function IngredientsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero heading */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50">
          Explore Ingredients
        </h1>
        <p className="text-zinc-400 text-sm max-w-xl">
          Browse through hundreds of ingredients and discover the meals you can make with each one.
        </p>
      </div>

      {/* Grid wrapped in Suspense */}
      <Suspense fallback={<GridSkeleton />}>
        <IngredientGrid />
      </Suspense>
    </div>
  );
}
