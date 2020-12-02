//will run program
"use strict";
const appConfig = require("../app-config.json");

import { WordCountObject } from "../models";
import { Parser } from "../parser";
import { LocalFileReader } from "../reader/reader";

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

