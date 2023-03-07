import cleanString from "../utils/cleanString";
import transformToString from "./transformToString";

function transformToCleanString(value: string | string[], key?: string) {
  return cleanString(transformToString(value, key));
}

export default transformToCleanString;
