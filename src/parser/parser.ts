import { WordCountObject } from "../models";

export class Parser {
  
  constructor() {}

  parseTextWordsBasedSpace(parseWordsString: string): string[] {
    return parseWordsString.trim().split(" ");
  }

  parseStopWordsBasedOnLineBreak(parseWordsString: string): string[] {
    return parseWordsString.split("\n");
  }

  normalizeWords(textFromFileArray: string[]): string[] {
    textFromFileArray.forEach(word => {
      word = word.replace(',', '');
      word = word.replace('.', '');
      word = word.toLowerCase().trim();
    });
    return textFromFileArray;
  }

  extractWordsFromText(stopWordsArray: string[], textFromFileArray: string[]): WordCountObject[]{
    let extractedWordsArray: WordCountObject[] = [];
    stopWordsArray.forEach((stopWord) => {
      textFromFileArray.forEach(word => {
        let exists = false;
        if(stopWord.toLowerCase().trim() === word.toLowerCase()) {
          extractedWordsArray.forEach(extractedWordObject => {
            //if it exists in extractedWordsArray//
            if(extractedWordObject.word.toLowerCase().trim() === word.toLowerCase()){
              ++extractedWordObject.count
              exists = true;
            } 
          });
          if(exists === false) {
             // //if doesn't exist, add with count of 1//
            extractedWordsArray.push({
              word: stopWord.toLowerCase(),
              count: 1
            });
          }
        }
      });
    });

    
// stopWordsArray.forEach((stopWord) => {
//   textFromFileArray.forEach(word => {
//     if(stopWord.toLowerCase().trim() === word.toLowerCase()) {
//       removedWordsArray.push(word.toLowerCase());
//      }
//   });
// });


// let removedWordsArrayWithCount: any[] = [];
// removedWordsArray.forEach(word => {
//   if(!Object.keys(removedWordsArrayWithCount).includes(word)){
//     removedWordsArrayWithCount.push({
//       word: {
//         count: 1
//       }
//     });
//   } else {
//     ++removedWordsArrayWithCount[word].count
//   }
// });

    return extractedWordsArray;
  }

  orderArrayOnCountDesc(extractedWordsArray: WordCountObject[]): WordCountObject[] {
    return extractedWordsArray.sort((a,b) => {
      return b.count - a.count;
    });
  }

  showTwentyMostPrevelantWords(extractedWordsArray: WordCountObject[]): WordCountObject[] {
    return extractedWordsArray.slice(0,20);
  }
}
