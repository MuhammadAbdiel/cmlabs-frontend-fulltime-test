// Shape returned by filter.php?i={ingredient}
export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

// A single ingredient+measure pair (parsed from MealDetail)
export interface MealIngredient {
  ingredient: string;
  measure: string;
}

// Full shape returned by lookup.php?i={id}
export interface MealDetail {
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
  // Parsed ingredient list (not raw strIngredient1…20 fields)
  ingredients: MealIngredient[];
  dateModified: string | null;
}

// Props for MealCard molecule
export interface MealCardProps {
  meal: MealSummary;
}

// Props for MealDetailPanel organism
export interface MealDetailPanelProps {
  meal: MealDetail;
}
