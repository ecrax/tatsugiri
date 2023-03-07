/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// @ts-nocheck
import logger from "../utils/logger";
import cleanString from "../utils/cleanString";

function transformInstructions(value: string | string[] | unknown[]) {
  if (typeof value === "string") {
    const cleanedValue = cleanString(value);
    if (cleanedValue.includes(".,")) {
      // special case for kingarthurflour.com
      return cleanedValue.split(".,").map((item) => item.trim());
    }

    return [cleanedValue];
  }

  // TODO
  if (Array.isArray(value) && value.length > 0) {
    // microdata
    const firstItem = value[0] as string;
    if (typeof firstItem === "string") {
      return value.map((item) => cleanString(item as string)); // loop through items and clean
    }

    // json ld
    return value.map((item) => {
      if (item.text) {
        return cleanString(item.text as string);
      } else {
        logger("recipe instructions array has different format", value);
        return "";
      }
    });
  }

  return "";
}

export default transformInstructions;
