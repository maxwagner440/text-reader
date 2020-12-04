'use strict';
const stemmer = require('porter-stemmer').stemmer

import { WordCountObject, constants } from "../models";

export class Parser {
  
  constructor() {}

  parseTextWordsBasedSpace(parseWordsString: string): string[] {
    return parseWordsString.trim().split(constants.space);
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

  normalizeWordString(word: string): string {
    return word.toLowerCase().replace(constants.notAlph, constants.empty);
  }

  normalizeWordStringArray(textFromFileArray: string[]): string[] {
    return textFromFileArray.map(word => {
       return this.normalizeWordString(word);
    });
  }

  // extractWordsFromTextBasedOnStopWords(stopWordsArray: string[], textFromFileArray: string[]): WordCountObject[]{
  //   let extractedWordsArray: WordCountObject[] = [];

  //   stopWordsArray.forEach((stopWord) => {
  //     textFromFileArray.forEach(word => {
  //       if(stopWord.trim() === word) {
  //         extractedWordsArray = this.buildExtractedWordsArrayWithCount(extractedWordsArray, word);
  //       }
  //     });
  //   });

  //   return extractedWordsArray;
  // }

  countAllWordsFromText(textFromFileArray: string[], stopWordArray: string[]): WordCountObject[]{
    let totalCountArray: WordCountObject[] = [];

    textFromFileArray.forEach(word => {
      totalCountArray = this.buildExtractedWordsArrayWithCount(totalCountArray, stopWordArray, word);
    });

    return totalCountArray;
  }

  orderArrayOnCountDesc(extractedWordsArray: WordCountObject[]): WordCountObject[] {
    return extractedWordsArray.sort((a,b) => {
      return b.count - a.count;
    });
  }

  showTwentyMostPrevalantWords(extractedWordsArray: WordCountObject[]): WordCountObject[] {
    return extractedWordsArray.slice(constants.sliceBeginZero, constants.sliceEndTwenty);
  }

  convertStemmerBaseWord(stringArray: string[] ): string[] {
    return stringArray.map(str => {
      return str = stemmer(str)
    })
  }

  private buildExtractedWordsArrayWithCount(initialArray: WordCountObject[], stopWordArray: string[], word: string): WordCountObject[] {
    let exists = false;

    if(!stopWordArray.find(stopWord => stopWord === word)) {

      initialArray.forEach(extractedWordObject => {
        if(extractedWordObject.word.trim() === word){
          ++extractedWordObject.count
          exists = true;
        } 
      });
  
      if(exists === false) {
          initialArray.push({
            word: word,
            count: constants.one
          });
      }
  
    }

    return initialArray;
  }
}
