import Image from 'next/image';
import { Badge } from '@/components/atoms/Badge/Badge';
import type { MealDetailPanelProps } from '@/types/meal.types';
import { extractYouTubeId, formatText } from '@/lib/utils';

export function MealDetailPanel({ meal }: MealDetailPanelProps) {
  const youtubeId = meal.strYoutube ? extractYouTubeId(meal.strYoutube) : null;
  const tags = meal.strTags?.split(',').map((t) => t.trim()).filter(Boolean) ?? [];

  return (
    <article className="space-y-10">
      {/* ── Top: image + meta ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: hero image */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Right: title + meta + ingredients */}
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-zinc-50 leading-tight">{meal.strMeal}</h1>

            {/* Category / Area badges */}
            <div className="flex flex-wrap gap-2">
              {meal.strCategory && <Badge label={meal.strCategory} variant="default" />}
              {meal.strArea && <Badge label={meal.strArea} variant="outline" />}
              {tags.map((tag) => (
                <Badge key={tag} label={tag} variant="outline" />
              ))}
            </div>
          </div>

          {/* Ingredients list */}
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Ingredients
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {meal.ingredients.map(({ ingredient, measure }, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 py-1.5 border-b border-zinc-800/80">
                  <span className="text-sm text-zinc-200">{formatText(ingredient)}</span>
                  <span className="text-sm text-zinc-500 shrink-0 text-right">{measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Instructions ─────────────────────────────────────────────── */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
          Instructions
        </h2>
        <div className="prose prose-invert prose-sm max-w-none text-zinc-300 leading-relaxed whitespace-pre-line">
          {meal.strInstructions}
        </div>
      </div>

      {/* ── YouTube embed ─────────────────────────────────────────────── */}
      {youtubeId && (
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Video Tutorial
          </h2>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={`${meal.strMeal} video tutorial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      )}

      {/* Source link */}
      {meal.strSource && (
        <p className="text-xs text-zinc-600">
          Recipe source:{' '}
          <a
            href={meal.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-amber-400 transition-colors"
          >
            {meal.strSource}
          </a>
        </p>
      )}
    </article>
  );
}

export default MealDetailPanel;
