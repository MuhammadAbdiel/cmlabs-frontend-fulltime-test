import { useState, useEffect, useRef, useMemo } from 'react';

export function useInfiniteScroll<T>(items: T[], itemsPerPage = 24) {
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Reset page to 1 when the items array changes (e.g., due to search filtering)
  useEffect(() => {
    setPage(1);
  }, [items]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    // Use IntersectionObserver to detect when the trigger element is visible
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: '200px' } // Load slightly before reaching the bottom
    );

    observerRef.current.observe(el);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [items.length]); // Re-bind observer if totally needed, though mostly static

  const visibleItems = useMemo(() => {
    return items.slice(0, page * itemsPerPage);
  }, [items, page, itemsPerPage]);

  const hasMore = visibleItems.length < items.length;

  return { visibleItems, loadMoreRef, hasMore };
}
