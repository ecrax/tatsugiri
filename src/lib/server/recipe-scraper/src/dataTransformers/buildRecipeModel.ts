/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import consolidateRecipeProperties, {
  prospectiveProperties,
} from "./consolidateRecipeProperties";
import propertyTransformerMap from "./propertyTransformerMap";

export type recipeProperties = keyof typeof propertyTransformerMap;

const buildRecipeModel = (prospectiveProperties: prospectiveProperties) => {
  const recipe = consolidateRecipeProperties(prospectiveProperties);

  // parse and transform the property values
  const transformedRecipe = {} as Record<
    recipeProperties,
    string | string[] | undefined
  >;
  const props = Object.entries(recipe) as [
    recipeProperties,
    string | string[] | undefined
  ][];
  props.forEach(([key, value]) => {
    const propertyTransformer = propertyTransformerMap[key];
    if (propertyTransformer && value) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      transformedRecipe[key] = propertyTransformer(value, key);
    }
  });

  return transformedRecipe;
};

export default buildRecipeModel;
