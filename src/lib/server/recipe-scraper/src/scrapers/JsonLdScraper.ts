/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CheerioAPI } from 'cheerio';
import logger from '../utils/logger';
import Scraper from './Scraper';

class JsonLdScraper extends Scraper {
  constructor(chtml: CheerioAPI) {
    super(chtml);
    this.type = 'jsonld';
  }

  testForMetadata() {
    const json: any[] = [];
    const jsonLdFromHtml = this.chtml('script[type="application/ld+json"]');

    (Object.entries(jsonLdFromHtml) as [string, any][]).forEach(([, item]) => {
      let contents;
      try {
        if (
          item &&
          item.children &&
          item.children[0] &&
          item.children[0].data
        ) {
          contents = JSON.parse(item.children[0].data);
        }
      } catch (e) {
        logger('JsonLd: error parsing the json data', e);
        // Fail silently, in case there are valid tags
        return;
      }
      if (contents) {
        json.push(contents);
      }
    });

    if (json.length === 0) {
      logger('Error: No JSON-LD valid script tags present on page');
      return;
    }

    this.meta = json.length > 1 ? json : json[0];
  }

  findRecipeItem() {
    if (this.meta['@type'] === 'Recipe') {
      // nytimes, food.com, bonappetite, ohsheglows, simplyrecipes
      this.recipeItem = this.meta;
      return;
    }
    // @graph: king arthur, 12tomatoes, sallysbaking, cookie&kate
    // other: martha stewart, foodnetwork, eatingwell, allrecipes, myrecipes, seriouseats, skinnytaste
    const graphLevel = this.meta['@graph'] || this.meta;
    this.recipeItem = (Object.values(graphLevel) as any[]).find(
      (item) => item['@type'] === 'Recipe'
    );
    if (this.recipeItem == null) {
      this.recipeItem = (Object.values(graphLevel) as any[]).find((item) =>
        item['@type'].includes('Recipe')
      );
    }
  }
}

export default JsonLdScraper;
