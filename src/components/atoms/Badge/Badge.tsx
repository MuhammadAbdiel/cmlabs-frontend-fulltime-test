import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'outline' | 'success' | 'warning' | 'error';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  outline: 'bg-transparent text-zinc-300 border border-zinc-700',
  success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  warning: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
  error:   'bg-red-500/15 text-red-400 border border-red-500/30',
};

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium tracking-wide',
        variantClasses[variant],
        className
      )}
    >
      {label}
    </span>
  );
}

export default Badge;
