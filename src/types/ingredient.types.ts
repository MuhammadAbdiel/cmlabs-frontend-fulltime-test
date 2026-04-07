// Shape returned by TheMealDB list.php?i=list
export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

// Props for the IngredientCard molecule
export interface IngredientCardProps {
  ingredient: Ingredient;
}
