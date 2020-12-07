'use strict';
const appConfig = require('../app-config.json');

import { IWordCountObject, IStemmerObject } from '../models';
import { Parser } from '../parser';
import { LocalFileReader } from '../reader';

const fr = new LocalFileReader();
const parser = new Parser();

let textFromFile: string
let stopWords: string
let textFromFileArray: string[] = [];
let stopWordsArray: string[] = [];
let stemmertextFromFileArray: IStemmerObject[] = [];

function buildStopWordsStringArray(stopWord: string): string[] {
  return parser.normalizeWordStringArray(
      parser.parseStopWordsBasedOnLineBreak(stopWord)
    );
}

function buildAllTextWordsStringArray(textFromFile: string): string[] {
  return parser.filterForWordsWithinStringArray(
    parser.parseTextWordsBasedOnNonAlphabetical(textFromFile)
    );
}

function buildTwentyMostPrevalantExistingWords(stemmertextFromFileArray: IStemmerObject[], stopWordsArray:string[]): IWordCountObject[] {
  return parser.showTwentyMostPrevalantWords(
    parser.orderArrayOnCountDesc(
      parser.countAllWordsFromTextThatAreNotStopWords(stemmertextFromFileArray, stopWordsArray)
      )
    );
}

function run(): void {

  textFromFile = fr.readFile(appConfig.textFilePath);
  stopWords = fr.readFile(appConfig.stopWordsFilePath);

  if(textFromFile.length > 0) {
    stopWordsArray = buildStopWordsStringArray(stopWords);
    textFromFileArray = buildAllTextWordsStringArray(textFromFile);
  
    stemmertextFromFileArray = parser.convertStemmerBaseWord(textFromFileArray);
    
    let mostPrevalantExistingWords = buildTwentyMostPrevalantExistingWords(stemmertextFromFileArray, stopWordsArray);
    
    console.log(mostPrevalantExistingWords);
  } else {
    console.log('There was no text to parse inside the file');
  }
  
}

run();
