/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import cleanIngredientAmounts from '../utils/cleanIngredientAmounts';
import logger from '../utils/logger';

const transformIngredients = (value: any[] | string) => {
  if (typeof value === 'string') return value;

  // jsonld
  if (value && typeof value[0] === 'string') {
    return value.map((item) => cleanIngredientAmounts(item as string));
  }

  // array of objects (microdata)
  const mappedItems: string[] = [];

  Object.entries(value).forEach(([, item]) => {
    if (item.properties) {
      const { name, amount } = item.properties;
      if (name || amount) {
        const _name = name && name[0];
        const _amount = amount && amount[0];
        const singleLine = _amount ? `${_amount} ${_name}` : _name;
        mappedItems.push(cleanIngredientAmounts(singleLine as string));
      }
    }
  });
  // log issue
  if (mappedItems.length) {
    return mappedItems;
  }

  logger('transformIngredients:microdata:item without properties', value);
  return [];
};

export default transformIngredients;
