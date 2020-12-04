/**
 * Requirements:
 *  reads a text file
 *  removes stop words
 *  removes all non-alphabetical text
 *  sets stem words to root form (pulling to pull)
 *  computes frequency of each term
 *  prints out 20 most commonly occuring terms (not including stop words)
 *    so if an occurring term is a stop term, exclude it from the mostPrevalant array!!!!
 *  Prints in DESC order
 *  Tests to prove
 *  Readme
 * 
 * TODO:
 *    --1. include the stemming algorithm
 *    2. tests!!!
 *    3. readme file
 *        explain what it does, any assumptions
 *    NO (put in assumptions) ?4. maybe produce output files??
 *    NO (put in assumptions) ?5. see about the 'tabbed' stop word
 *    6. maybe rename folders
 *    --7. remove ALL non-alphabetical text (better way to do it)
 *    8. refactor
 *    --9. print out 20 most commonly occuring terms (that are not stop words?) might as well include both and explain assumption
 *    10. get npm to work
 *    --11. remove stop words from prevalant array
 */

 //FOR INSTALL: REDO, had to reinstall glovally typescript and ts-node. FIX

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

function buildStopWordsStringArray(stopWord: string): string[] {
  return parser.normalizeWordStringArray(
      parser.parseStopWordsBasedOnLineBreak(stopWord)
    );
}

function buildAllTextWordsStringArray(textFromFile: string): string[] {
  return parser.filterForWordsWithinStringArray(
    parser.parseTextWordsBasedSpace(textFromFile)
    );
}

function buildTwentyMostPrevalantExistingWords(stemmertextFromFileArray: string[], stopWordsArray:string[]): WordCountObject[] {
  return parser.showTwentyMostPrevalantWords(
    parser.orderArrayOnCountDesc(
      parser.countAllWordsFromText(stemmertextFromFileArray, stopWordsArray)
      )
    );
}

function run(): void {

  textFromFile = fr.readFile(appConfig.textFilePath);
  stopWords = fr.readFile(appConfig.stopWordsFilePath);
  
  //normalize and remove anything non-alphabetical
  stopWordsArray = buildStopWordsStringArray(stopWords);
  textFromFileArray = buildAllTextWordsStringArray(textFromFile);
  
  //stemmer stuff (NEEDS WORK)
  let stemmertextFromFileArray: string[] = textFromFileArray//parser.convertStemmerBaseWord(textFromFileArray)
  
  let mostPrevalantExistingWords = buildTwentyMostPrevalantExistingWords(stemmertextFromFileArray, stopWordsArray);
  
  console.log(mostPrevalantExistingWords);
}

run();
