import axios from 'axios';
import { CheerioAPI, load } from 'cheerio';
import MicrodataScraper from './scrapers/MicrodataScraper';
import JsonLdScraper from './scrapers/JsonLdScraper';
import logger from './utils/logger';

const errorMessage = 'Could not find recipe data';

export type Recipe = {
  url: string;
  name: string;
  image: string;
  description: string;
  cookTime: string;
  prepTime: string;
  totalTime: string;
  recipeYield: string;
  recipeIngredients: string[];
  recipeInstructions: string[];
  recipeCategories: string[];
  recipeCuisines: string[];
  recipeTypes: string[];
  keywords: string[];
};

const scraper = async (
  url: string,
  options: { printToConsole?: boolean } = {}
) => {
  const { printToConsole } = options;

  let chtml: CheerioAPI;

  try {
    // load html from scraped url
    const resp = await axios(url);
    chtml = load(resp.data as string);
  } catch (error) {
    throw new Error(errorMessage);
  }

  try {
    // attempt to find JsonLd data, return recipe or log and continue
    const jsonLdScraper = new JsonLdScraper(chtml);
    const recipe = jsonLdScraper.getRecipe();

    if (printToConsole) {
      jsonLdScraper.print();
    }

    return {
      ...recipe,
      url,
    } as Recipe;
  } catch (error) {
    logger('main:JsonLdScraper', {
      ...(error as object),
      url,
    });
  }

  // attempt to find microdata, return recipe or log and continue
  try {
    const microdataScraper = new MicrodataScraper(chtml);
    const recipe = microdataScraper.getRecipe();

    if (printToConsole) {
      microdataScraper.print();
    }

    return {
      ...recipe,
      url,
    } as Recipe;
  } catch (error) {
    logger('main:MicrodataScraper', {
      ...(error as object),
      url,
    });
  }

  // could add a Scraper for rdfa in the future

  // throw if no recipe found
  throw new Error(errorMessage);
};

export default scraper;
