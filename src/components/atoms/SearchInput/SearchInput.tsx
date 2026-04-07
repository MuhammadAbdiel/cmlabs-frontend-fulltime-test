'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  className,
  isLoading = false,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync external value changes (e.g. reset)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setLocalValue(next);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(next);
    }, 300);
  }

  function handleClear() {
    setLocalValue('');
    onChange('');
  }

  return (
    <div className={cn('relative flex items-center', className)}>
      {/* Search icon or spinner */}
      <span className="absolute left-3 flex items-center pointer-events-none text-zinc-400">
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        ) : (
          <Search className="h-4 w-4" aria-hidden="true" />
        )}
      </span>

      <input
        id="search-input"
        type="search"
        role="searchbox"
        aria-label={placeholder}
        autoComplete="off"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-xl border border-zinc-800 bg-zinc-900/60 py-2.5 pl-10 pr-10',
          'text-sm text-zinc-100 placeholder:text-zinc-500',
          'outline-none transition-all duration-200',
          'focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20',
          'hover:border-zinc-700',
          '[&::-webkit-search-cancel-button]:appearance-none'
        )}
      />

      {/* Clear button */}
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 flex items-center text-zinc-500 hover:text-zinc-200 transition-colors duration-150"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
