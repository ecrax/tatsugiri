/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CheerioAPI } from 'cheerio';
import microdata from 'microdata-node';
import Scraper from './Scraper';

class MicrodataScraper extends Scraper {
  constructor(chtml: CheerioAPI) {
    super(chtml);
    this.type = 'microdata';
  }

  testForMetadata() {
    const meta: Record<string, any> | undefined = microdata.toJson(
      this.chtml.html()
    );
    if (!meta || !meta.items || (Array.isArray(meta.items) && !meta.items[0])) {
      return;
    }
    this.meta = meta;
  }

  findRecipeItem() {
    const recipe = (Object.values(this.meta.items) as any[]).find(
      (item) => item.type[0].indexOf('Recipe') > -1
    );
    this.recipeItem = recipe ? recipe.properties : null;
  }
}

export default MicrodataScraper;
