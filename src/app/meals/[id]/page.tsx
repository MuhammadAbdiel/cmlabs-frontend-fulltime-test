'use client';

import { Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Breadcrumb } from '@/components/molecules/Breadcrumb/Breadcrumb';
import { MealDetailPanel } from '@/components/organisms/MealDetailPanel/MealDetailPanel';
import { SkeletonCard } from '@/components/atoms/SkeletonCard/SkeletonCard';
import { useMealDetail } from '@/hooks/useMealDetail';
import { formatText } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <SkeletonCard className="aspect-square" />
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 rounded-md bg-zinc-800 animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
        ))}
      </div>
    </div>
  );
}

function MealDetailContent({ mealId, ingredient }: { mealId: string; ingredient: string }) {
  const { mealDetail, status, error } = useMealDetail(mealId);

  if (status === 'loading' || status === 'idle') return <DetailSkeleton />;

  if (status === 'error' || !mealDetail) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-red-400">
        <AlertCircle className="h-10 w-10 opacity-60" />
        <p className="text-sm">{error ?? 'Failed to load meal detail.'}</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Ingredients', href: '/' },
    ...(ingredient
      ? [{ label: formatText(ingredient), href: `/ingredients/${encodeURIComponent(ingredient)}` }]
      : []),
    { label: mealDetail.strMeal },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <MealDetailPanel meal={mealDetail} />
    </>
  );
}

export default function MealDetailPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const ingredient = searchParams.get('ingredient') ?? '';

  return (
    <div className="space-y-8 animate-fade-in">
      <Suspense fallback={<DetailSkeleton />}>
        <MealDetailContent mealId={params.id} ingredient={ingredient} />
      </Suspense>
    </div>
  );
}
