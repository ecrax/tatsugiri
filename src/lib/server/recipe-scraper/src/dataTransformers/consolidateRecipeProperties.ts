import logger from "../utils/logger";

export type prospectiveProperties = {
  url?: string;
  name?: string;
  image?: string;
  photo?: string;
  thumbnailUrl?: string;
  description?: string;
  cookTime?: string;
  prepTime?: string;
  totalTime?: string;
  recipeYield?: string;
  yield?: string;
  recipeIngredients?: string[];
  recipeIngredient?: string;
  ingredients?: string[];
  ingredient?: string;
  recipeInstructions?: string[];
  instructions?: string[];
  step?: string;
  recipeCategory?: string[];
  recipeCuisine?: string[];
  recipeType?: string[];
  keywords?: string[];
  tag?: string;
};

export const consolidateRecipeProperties = (
  prospectiveProperties: prospectiveProperties
) => {
  const {
    url,
    name,
    image,
    photo,
    thumbnailUrl,
    description,
    cookTime,
    prepTime,
    totalTime,
    recipeYield,
    yield: rYield,
    recipeIngredients,
    recipeIngredient,
    ingredients,
    ingredient,
    recipeInstructions,
    instructions,
    step,
    recipeCategory,
    recipeCuisine,
    recipeType,
    keywords,
    tag,
  } = prospectiveProperties;

  if (step) {
    // didn't find any recipes that use step
    logger("buildRecipeModel:may need extra parsing for step property");
  }

  // consolidate the properties into new model
  return {
    url,
    name, // string
    image: image || photo || thumbnailUrl, // string
    description, // string
    cookTime, // string
    cookTimeOriginalFormat: cookTime, // string
    prepTime, // string
    prepTimeOriginalFormat: prepTime, // string
    totalTime, // string
    totalTimeOriginalFormat: totalTime, // string
    recipeYield: recipeYield || rYield, // string
    recipeIngredients:
      recipeIngredient || recipeIngredients || ingredients || ingredient, // array of strings
    recipeInstructions: recipeInstructions || instructions || step, // array of strings
    recipeCategories: recipeCategory, // array of strings
    recipeCuisines: recipeCuisine, // array of strings
    recipeTypes: recipeType, // array of strings
    keywords: keywords || tag, // array of strings
  };
};

export default consolidateRecipeProperties;
