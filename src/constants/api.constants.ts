// TheMealDB API base URL and endpoint paths

export const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const API_ENDPOINTS = {
  LIST_INGREDIENTS: '/list.php?i=list',
  FILTER_BY_INGREDIENT: '/filter.php',
  LOOKUP_MEAL: '/lookup.php',
} as const;

export const REQUEST_TIMEOUT_MS = 10_000;
