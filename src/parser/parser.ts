import { WordCountObject, constants } from "../models";

export class Parser {
  
  constructor() {}

  parseTextWordsBasedSpace(parseWordsString: string): string[] {
    return parseWordsString.trim().split(constants.space);
  }

  parseStopWordsBasedOnLineBreak(parseWordsString: string): string[] {
    return parseWordsString.split(constants.newLineChar);
  }

  normalizeWords(textFromFileArray: string[]): string[] {
    textFromFileArray.map(word => {
      word = word.replace(constants.comma, constants.empty);
      word = word.replace(constants.period, constants.empty);
      word = word.replace(constants.allNonAlph, constants.empty);
      word = word.replace(constants.newLineChar, constants.empty);
      word = word.replace(constants.backRN, constants.empty);
      word = word.replace(constants.backR, constants.empty)
      word = word.replace(constants.backN, constants.empty)
      word = word.replace(constants.backT, constants.empty)
      word = word.replace(constants.backB, constants.empty)
      word = word.replace(constants.backF, constants.empty)

      word = word.toLowerCase();
    });
     return textFromFileArray;
  }

  extractWordsFromText(stopWordsArray: string[], textFromFileArray: string[]): WordCountObject[]{
    let extractedWordsArray: WordCountObject[] = [];
    stopWordsArray.forEach((stopWord) => {
      textFromFileArray.forEach(word => {
        if(stopWord.toLowerCase().trim() === word.toLowerCase()) {
          extractedWordsArray = this.buildExtractedWordsArray(extractedWordsArray, word.toLowerCase());
        }
      });
    });

    return extractedWordsArray;
  }

  countAllWordsFromText(textFromFileArray: string[]): WordCountObject[]{
    let totalCountArray: WordCountObject[] = [];

    textFromFileArray.forEach(word => {
      totalCountArray = this.buildExtractedWordsArray(totalCountArray, word.toLowerCase());
    });

    return totalCountArray;
  }

  buildExtractedWordsArray(initialArray: WordCountObject[], stopWord: string): WordCountObject[] {
    let exists = false;
    initialArray.forEach(extractedWordObject => {
      //if it exists in extractedWordsArray//
      if(extractedWordObject.word.toLowerCase().trim() === stopWord.toLowerCase()){
        ++extractedWordObject.count
        exists = true;
      } 
    });
    if(exists === false) {
        // //if doesn't exist, add with count of 1//
        initialArray.push({
        word: stopWord.toLowerCase(),
        count: constants.one
      });
    }

    return initialArray;
  }

  orderArrayOnCountDesc(extractedWordsArray: WordCountObject[]): WordCountObject[] {
    return extractedWordsArray.sort((a,b) => {
      return b.count - a.count;
    });
  }

  showTwentyMostPrevelantWords(extractedWordsArray: WordCountObject[]): WordCountObject[] {
    return extractedWordsArray.slice(constants.sliceBeginZero, constants.sliceEndTwenty);
  }
}
