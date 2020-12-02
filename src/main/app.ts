/**
 * TODO:
 *    1. include the stemming algorithm
 *    2. tests!!!
 *    3. readme file
 *        explain what it does, any assumptions
 *    4. maybe produce output files??
 *    5. see about the 'tabbed' stop word
 *    6. maybe rename folders
 *    7. remove ALL non-alphabetical text (better way to do it)
 *    8. refactor
 *    9. print out 20 most commonly occuring terms (that are not stop words?) might as well include both and explain assumption
 */


'use strict';
const appConfig = require('../app-config.json');

import { WordCountObject } from '../models';
import { Parser } from '../parser';
import { LocalFileReader } from '../reader/reader';

const fr = new LocalFileReader();
const parser = new Parser();

let textFromFile: string
let stopWords: string
let textFromFileArray: string[] = [];
let stopWordsArray: string[] = [];

textFromFile = fr.readFile(appConfig.textFilePath);
stopWords = fr.readFile(appConfig.stopWordsFilePath);

textFromFileArray = parser.parseTextWordsBasedSpace(textFromFile);
stopWordsArray = parser.parseStopWordsBasedOnLineBreak(stopWords);

//filter out crap that is in each string (comma's, quotes, periods, etc...)
//NEED TO: REMOVE ALL NON-ALPHABETICAL TEXT
textFromFileArray = parser.normalizeWords(textFromFileArray);

let extractedWordsArray: WordCountObject[] = parser.extractWordsFromText(stopWordsArray, textFromFileArray);
//removed words from text//

let mostPrevelantWords = 
  parser.showTwentyMostPrevelantWords(
    parser.orderArrayOnCountDesc(extractedWordsArray)
    );

console.log(mostPrevelantWords);
//if textFromFileArray string exists in stopWord array
  //REMOVE IT FROM textFromFileArray
  //ADD IT TO removedWordsArray (if it doesn't exist already)
  //IF IT ALREADY EXISTS IN removedWordsArray, add +1 to counter of that word object


//STEM WORDS

//PRINT OUT TOP 20 HIGHEST PREVELANT IN removedWordsArray

