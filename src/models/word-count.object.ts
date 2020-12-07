import { IStemmerObject } from "./stemmer.object";

export interface IWordCountObject extends IStemmerObject {
  count: number;
}