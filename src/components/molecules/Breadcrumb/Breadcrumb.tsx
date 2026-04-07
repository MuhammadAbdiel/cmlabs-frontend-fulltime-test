import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1", className)}
    >
      <ol className="flex items-center gap-1 flex-wrap">
        {/* Home icon as first crumb */}
        <li>
          <Link
            href="/"
            className="flex items-center text-zinc-500 hover:text-amber-400 transition-colors duration-150"
            aria-label="Home"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1">
              <ChevronRight
                className="h-3.5 w-3.5 text-zinc-700 shrink-0"
                aria-hidden="true"
              />
              {isLast || !item.href ? (
                <span
                  className="text-xs font-medium text-zinc-100 max-w-[160px] truncate"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-xs font-medium text-zinc-400 hover:text-amber-400 transition-colors duration-150 max-w-[160px] truncate"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
