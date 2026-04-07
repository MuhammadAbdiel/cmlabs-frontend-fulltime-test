"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { MealCardProps } from "@/types/meal.types";

export function MealCard({ meal }: MealCardProps) {
  const searchParams = useSearchParams();
  // Carry the ingredient param forward so the detail page can build its breadcrumb
  const from = searchParams.get("ingredient") ?? "";
  const href = `/meals/${meal.idMeal}${from ? `?ingredient=${encodeURIComponent(from)}` : ""}`;

  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden
                 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40
                 hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)] focus-visible:outline-none
                 focus-visible:ring-2 focus-visible:ring-amber-500/50"
      aria-label={`View recipe for ${meal.strMeal}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-zinc-900/70 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      <div className="px-4 py-3">
        <p className="text-sm font-semibold text-zinc-100 line-clamp-2 leading-snug group-hover:text-amber-400 transition-colors duration-200">
          {meal.strMeal}
        </p>
      </div>
    </Link>
  );
}

export default MealCard;
