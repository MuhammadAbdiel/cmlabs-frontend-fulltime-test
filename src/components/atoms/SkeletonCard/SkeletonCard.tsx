import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading…"
      className={cn(
        'rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden',
        className
      )}
    >
      {/* Image placeholder */}
      <div className="aspect-square w-full animate-pulse bg-zinc-800" />

      {/* Text placeholder */}
      <div className="p-4 space-y-2">
        <div className="h-3.5 w-3/4 animate-pulse rounded-md bg-zinc-800" />
        <div className="h-3 w-1/2 animate-pulse rounded-md bg-zinc-800/60" />
      </div>
    </div>
  );
}

export default SkeletonCard;
