'use strict';
const stemmer = require('porter-stemmer').stemmer

import { IWordCountObject, constants } from "../models";
import { IStemmerObject } from "../models/stemmer.object";

export class Parser {
  
  constructor() {}

  parseTextWordsBasedOnNonAlphabetical(parseWordsString: string): string[] {
    return parseWordsString.trim().split(constants.notAlph);
  }

  parseStopWordsBasedOnLineBreak(parseWordsString: string): string[] {
    return parseWordsString.trim().split(constants.newLineChar);
  }

  filterForWordsWithinStringArray(stringArray: string[]): string[] {
    var filteredWordsArray: string[] = []

    stringArray.map(word => {
      if(word.toLowerCase().match(constants.onlyAlph)) {
        filteredWordsArray.push(
          this.normalizeWordString(word)
        );
      }
    });

    return filteredWordsArray;
  }

  normalizeWordStringArray(textFromFileArray: string[]): string[] {
    return textFromFileArray.map(word => {
       return this.normalizeWordString(word);
    });
  }

  countAllWordsFromTextThatAreNotStopWords(textFromFileArray: IStemmerObject[], stopWordArray: string[]): IWordCountObject[]{
    let totalCountArray: IWordCountObject[] = [];

    textFromFileArray.forEach(stemWordObject => {
      totalCountArray = this.buildExtractedWordsArrayWithCount(totalCountArray, stopWordArray, stemWordObject);
    });

    return totalCountArray;
  }

  orderArrayOnCountDesc(extractedWordsArray: IWordCountObject[]): IWordCountObject[] {
    return extractedWordsArray.sort((a,b) => {
      return this.multiCompare(b.count,a.count) || this.multiCompare(a.word,b.word)
    });
  }

  showTwentyMostPrevalantWords(extractedWordsArray: IWordCountObject[]): IWordCountObject[] {
    return extractedWordsArray.slice(constants.sliceBeginZero, constants.sliceEndTwenty);
  }

  convertStemmerBaseWord(stringArray: string[] ): IStemmerObject[] {
    let stemmerArray: IStemmerObject[] = [];

    stringArray.map(str => {
      if(stemmer(str).toLowerCase().length > constants.one || stemmer(str).toLowerCase() === constants.a) {
        stemmerArray.push({
          word: str,
          stemmerWord: stemmer(str).toLowerCase()
        });
      }
    })

    return stemmerArray;
  }

  private normalizeWordString(word: string): string {
    return word.toLowerCase().replace(constants.notAlph, constants.empty);
  }

  private multiCompare(a: any, b: any) {
    if (a > b) {
      return +1;
    } 
    if (a < b) {
      return -1;
    } 

    return 0;
  }

  private buildExtractedWordsArrayWithCount(initialArray: IWordCountObject[], stopWordArray: string[], stemmerObject: IStemmerObject): IWordCountObject[] {
    let exists = false;

    if(!stopWordArray.find(stopWord => stopWord === stemmerObject.word)){
      initialArray.forEach(extractedWordObject => {
        if( extractedWordObject.stemmerWord === stemmerObject.stemmerWord){
          ++extractedWordObject.count
          exists = true;
        } 
      });
  
      if(exists === false) {
          initialArray.push({
            word: stemmerObject.word,
            stemmerWord: stemmerObject.stemmerWord,
            count: constants.one
          });
      }
    }

    return initialArray;
  }
}
