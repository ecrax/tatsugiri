import { type Recipe } from "@prisma/client";

export type FormRecipe = {
  recipeIngredients: { value: string }[];
  recipeInstructions: { value: string }[];
  recipeCategories: { value: string }[];
  recipeCuisines: { value: string }[];
  recipeTypes: { value: string }[];
  keywords: { value: string }[];
} & Omit<
  Recipe,
  | "recipeIngredients"
  | "recipeInstructions"
  | "recipeCategories"
  | "recipeCuisines"
  | "recipeTypes"
  | "keywords"
>;

// export type Recipe = {
//   url: string;
//   name: string;
//   image: string;
//   description: string;
//   cookTime: string;
//   prepTime: string;
//   totalTime: string;
//   recipeYield: string;
//   recipeIngredients: string[];
//   recipeInstructions: string[];
//   recipeCategories: string[];
//   recipeCuisines: string[];
//   recipeTypes: string[];
//   keywords: string[];
// };
