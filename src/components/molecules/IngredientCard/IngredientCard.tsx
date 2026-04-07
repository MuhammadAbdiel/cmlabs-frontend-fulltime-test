"use client";

import Image from "next/image";
import Link from "next/link";
import type { IngredientCardProps } from "@/types/ingredient.types";
import { formatText } from "@/lib/utils";

export function IngredientCard({ ingredient }: IngredientCardProps) {
  const name = ingredient.strIngredient;
  // Use the thumbnail URL directly from the API response
  const imageUrl = ingredient.strThumb;

  return (
    <Link
      href={`/ingredients/${encodeURIComponent(name)}`}
      className="group relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden
                 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40
                 hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)] focus-visible:outline-none
                 focus-visible:ring-2 focus-visible:ring-amber-500/50"
      aria-label={`View meals with ${name}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-800">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          unoptimized // TheMealDB images are external, skip Next.js optimisation
        />
        {/* Overlay shimmer on hover */}
        <div
          className="absolute inset-0 bg-linear-to-t from-zinc-900/60 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Name label */}
      <div className="px-4 py-3">
        <p className="text-sm font-semibold text-zinc-100 truncate leading-snug group-hover:text-amber-400 transition-colors duration-200">
          {formatText(name)}
        </p>
        <p className="mt-0.5 text-xs text-zinc-500">Tap to explore meals</p>
      </div>
    </Link>
  );
}

export default IngredientCard;
