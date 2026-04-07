'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/molecules/Breadcrumb/Breadcrumb';
import { MealGrid } from '@/components/organisms/MealGrid/MealGrid';
import { SkeletonCard } from '@/components/atoms/SkeletonCard/SkeletonCard';
import { formatText } from '@/lib/utils';

function MealGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default function IngredientsDetailPage() {
  const params = useParams<{ name: string }>();
  const name = decodeURIComponent(params.name);
  const displayName = formatText(name);

  return (
    <div className="space-y-8 animate-fade-in">
      <Breadcrumb
        items={[
          { label: 'Ingredients', href: '/' },
          { label: displayName },
        ]}
      />

      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">{displayName}</h1>
        <p className="text-zinc-400 text-sm">Meals you can make with this ingredient</p>
      </div>

      <Suspense fallback={<MealGridSkeleton />}>
        <MealGrid ingredientName={name} />
      </Suspense>
    </div>
  );
}
