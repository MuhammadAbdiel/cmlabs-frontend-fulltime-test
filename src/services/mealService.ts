import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '@/constants/api.constants';
import type { MealDbListResponse } from '@/types/api.types';
import type { Ingredient } from '@/types/ingredient.types';
import type { MealSummary, MealDetail, MealIngredient } from '@/types/meal.types';

// ── Raw API shape for a full meal detail (before parsing) ────────────────────
interface RawMealDetail {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  dateModified: string | null;
  [key: string]: string | null | undefined;
}

// Parse the 20 strIngredient/strMeasure fields into a clean array
function parseIngredients(raw: RawMealDetail): MealIngredient[] {
  const result: MealIngredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = raw[`strIngredient${i}`];
    const measure = raw[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      result.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() ?? '',
      });
    }
  }
  return result;
}

// ── Public service functions ─────────────────────────────────────────────────

/**
 * Fetch the full list of ingredients from TheMealDB.
 */
export async function getIngredients(): Promise<Ingredient[]> {
  const { data } = await axiosInstance.get<MealDbListResponse<Ingredient>>(
    API_ENDPOINTS.LIST_INGREDIENTS
  );
  return data.meals ?? [];
}

/**
 * Fetch all meals that use a given ingredient.
 */
export async function getMealsByIngredient(ingredientName: string): Promise<MealSummary[]> {
  const { data } = await axiosInstance.get<MealDbListResponse<MealSummary>>(
    API_ENDPOINTS.FILTER_BY_INGREDIENT,
    { params: { i: ingredientName } }
  );
  return data.meals ?? [];
}

/**
 * Fetch full meal detail by ID and normalise the ingredients array.
 */
export async function getMealDetail(mealId: string): Promise<MealDetail | null> {
  const { data } = await axiosInstance.get<MealDbListResponse<RawMealDetail>>(
    API_ENDPOINTS.LOOKUP_MEAL,
    { params: { i: mealId } }
  );

  const raw = data.meals?.[0];
  if (!raw) return null;

  const { idMeal, strMeal, strDrinkAlternate, strCategory, strArea, strInstructions,
    strMealThumb, strTags, strYoutube, strSource, dateModified } = raw;

  return {
    idMeal,
    strMeal,
    strDrinkAlternate,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strTags,
    strYoutube,
    strSource,
    dateModified,
    ingredients: parseIngredients(raw),
  };
}
