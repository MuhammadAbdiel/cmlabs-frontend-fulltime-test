// Generic API status union type
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

// TheMealDB wraps list endpoints in a `meals` array
export interface MealDbListResponse<T> {
  meals: T[] | null;
}
