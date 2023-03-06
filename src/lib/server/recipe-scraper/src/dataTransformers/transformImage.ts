import logger from "../utils/logger";

export type Image = {
  url: string;
  caption: string;
  width: string;
  heigh: string;
  thumbnail: string;
};

function transformImage(value: string | string[] | Image) {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value[0];
  }

  if (value.url) {
    return value.url;
  }

  logger("image in another format", value);
  return value.url;
}

export default transformImage;
