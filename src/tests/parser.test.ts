import { IWordCountObject } from "../models";
import { IStemmerObject } from "../models/stemmer.object";
import { Parser } from "../parser";

describe('parser', () => {
  let parser: Parser;

  beforeEach( () => {
    parser = new Parser();
  });

  describe('parseTextWordsBasedOnNonAlphabetical()', () => {
    it('should parse a string into a string array based on spaces', () => {
      const testString = 'hey you I have an idea'
      const result = parser.parseTextWordsBasedOnNonAlphabetical(testString);

      expect(result.length).toBe(6);
    });

    it('should parse a string into a string array based on spaces and comma', () => {
      const testString = 'hey you I have an idea,'
      const result = parser.parseTextWordsBasedOnNonAlphabetical(testString);

      expect(result.length).toBe(7);
    });

    it('should parse a string into a string array based on spaces and period', () => {
      const testString = 'hey you I have an idea.'
      const result = parser.parseTextWordsBasedOnNonAlphabetical(testString);

      expect(result.length).toBe(7);
    });

    it('should parse a string into a string array based on spaces and colon', () => {
      const testString = 'hey you I have an idea:'
      const result = parser.parseTextWordsBasedOnNonAlphabetical(testString);

      expect(result.length).toBe(7);
    });

    it('should parse a string into a string array based on spaces and two commas', () => {
      const testString = 'hey you I have an idea,,'
      const result = parser.parseTextWordsBasedOnNonAlphabetical(testString);

      expect(result.length).toBe(8);
    });

    it('should parse a string into a string array based on spaces and colon. Does not pick up colon', () => {
      const testString = 'hey you I have an : idea'
      const result = parser.parseTextWordsBasedOnNonAlphabetical(testString);

      expect(result.length).toBe(8);
    });

    it('should return an single string array', () => {
      const testString = ''
      const result = parser.parseTextWordsBasedOnNonAlphabetical(testString);

      expect(result.length).toBe(1);
    });

  });
  
  describe('parseStopWordsBasedOnLineBreak()', () => {
    it('should parse into three strings', () => {
      const testString = 'hey\n you\n guys\n';
      const result = parser.parseStopWordsBasedOnLineBreak(testString);
  
      expect(result.length).toBe(3);  
    });

    it('should parse into three strings with extra line break at end', () => {
      const testString = 'hey\n you\n guys\n\n';
      const result = parser.parseStopWordsBasedOnLineBreak(testString);
  
      expect(result.length).toBe(3);  
    });

    it('should parse into three strings with extra line break at beginning', () => {
      const testString = '\nhey\n you\n guys\n';
      const result = parser.parseStopWordsBasedOnLineBreak(testString);
  
      expect(result.length).toBe(3);  
    });

    it('should parse into three strings with extra line break with long string in beginning', () => {
      const testString = '\nhey. dude, did you know that?\n you\n guys\n';
      const result = parser.parseStopWordsBasedOnLineBreak(testString);
  
      expect(result.length).toBe(3);  
    });

    it('should parse into one string', () => {
      const testString = '';
      const result = parser.parseStopWordsBasedOnLineBreak(testString);
  
      expect(result.length).toBe(1);  
    });
  });

  describe('filterForWordsWithinStringArray', () => {
    it('should remove non words from string array ', () => {
      const testStringArray = ['32','\n\n', 'three']
      const result = parser.filterForWordsWithinStringArray(testStringArray);

      expect(result.length).toBe(1);  
      expect(result[0]).toBe('three');  
    });

    it('should remove non words from string array even with alphabetic', () => {
      const testStringArray = ['32','dude\r', 'three']
      const result = parser.filterForWordsWithinStringArray(testStringArray);

      expect(result.length).toBe(1);  
      expect(result[0]).toBe('three');  
    });

    it('should remove non words from string array even with periods and commas', () => {
      const testStringArray = ['32','dude..,,', 'three']
      const result = parser.filterForWordsWithinStringArray(testStringArray);

      expect(result.length).toBe(1);  
      expect(result[0]).toBe('three');  
    });
  })

  describe('normalizeWordStringArray()', () => {
    it('should remove commas, periods and a question mark', () => {
      const testStringArray = ['h.e.y.,..guy?'];
      const result = parser.normalizeWordStringArray(testStringArray);
  
      expect(result[0]).toBe('heyguy');  
    });

    it('should remove tabs, new lines and a slash', () => {
      const testStringArray = ['\t\the\ny\n\n/guy?'];
      const result = parser.normalizeWordStringArray(testStringArray);
  
      expect(result[0]).toBe('heyguy');  
    });

    it('should remove spaces', () => {
      const testStringArray = ['  h e y         guy '];
      const result = parser.normalizeWordStringArray(testStringArray);
  
      expect(result[0]).toBe('heyguy');  
    });

    it('should remove numbers', () => {
      const testStringArray = ['333h3ey123235235guy'];
      const result = parser.normalizeWordStringArray(testStringArray);
  
      expect(result[0]).toBe('heyguy');  
    });

    it('should remove numbers in both strings', () => {
      const testStringArray = ['333h3ey123235235guy', 'the235235dude323a3242bid3es'];
      const result = parser.normalizeWordStringArray(testStringArray);
  
      expect(result[0]).toBe('heyguy'); 
      expect(result[1]).toBe('thedudeabides');  
    });

    it('should return an empty array', () => {
      const testStringArray: string[] = [];
      const result = parser.normalizeWordStringArray(testStringArray);
  
      expect(result.length).toBe(0);  
    });
  });

  describe('countAllWordsFromTextThatAreNotStopWords()', () => {
    it('should remove a stop word from result', () => {
      const stopWordArray = ['dude']
      const textArray = [{
        word: 'government',
        stemmerWord: 'govern'
       }, 
       {
        word: 'dude',
        stemmerWord: 'dud'
       },
       {
        word: 'punching',
        stemmerWord: 'punch'
       }
      ];

      const result = parser.countAllWordsFromTextThatAreNotStopWords(textArray, stopWordArray)

      expect(result.length).toBe(2);
    });

    it('should count non stop words from result based on the stemmer word', () => {
      const stopWordArray = ['dude']
      const textArray = [{
        word: 'government',
        stemmerWord: 'govern'
       }, 
       {
        word: 'dude',
        stemmerWord: 'dud'
       },
       {
        word: 'punching',
        stemmerWord: 'punch'
       },
       {
        word: 'punched',
        stemmerWord: 'punch'
       },
      ];

      const result = parser.countAllWordsFromTextThatAreNotStopWords(textArray, stopWordArray)

      expect(result.length).toBe(2);
      result.map((word) => {
        if(word.stemmerWord === 'punch'){
          expect(word.count).toBe(2)
        }
      });
    });

    it('should not count stop words', () => {
      const stopWordArray = ['dude']
      const textArray = [{
        word: 'dude',
        stemmerWord: 'dud'
       }, 
       {
        word: 'dude',
        stemmerWord: 'dud'
       },
       {
        word: 'dude',
        stemmerWord: 'dud'
       },
       {
        word: 'dude',
        stemmerWord: 'dud'
       },
      ];

      const result = parser.countAllWordsFromTextThatAreNotStopWords(textArray, stopWordArray)

      expect(result.length).toBe(0);
    });
  });

  describe('orderArrayOnCountDesc()', () => {
    it('should return an ordered array based on count', () => {
      const testArray = [
        {
          word: 'one',
          stemmerWord: 'one',
          count: 1
        },
        {
          word: 'two',
          stemmerWord: 'two',
          count: 2
        },
        {
          word: 'three',
          stemmerWord: 'three',
          count: 3
        },
        {
          word: 'four',
          stemmerWord: 'four',
          count: 4
        }
      ]
      const result = parser.orderArrayOnCountDesc(testArray);

      expect(result[0].count).toBe(4);
      expect(result[1].count).toBe(3);
      expect(result[2].count).toBe(2);
      expect(result[3].count).toBe(1);
    });

    it('should return an ordered array based on count with some counts being the same', () => {
      const testArray = [
        {
          word: 'one',
          stemmerWord: 'one',
          count: 1
        },
        {
          word: 'two',
          stemmerWord: 'two',
          count: 1
        },
        {
          word: 'all',
          stemmerWord: 'all',
          count: 1
        },
        {
          word: 'three',
          stemmerWord: 'three',
          count: 3
        },
        {
          word: 'four',
          stemmerWord: 'four',
          count: 4
        }
      ]
      const result = parser.orderArrayOnCountDesc(testArray);

      expect(result[0].word).toBe('four');
      expect(result[1].word).toBe('three');
      expect(result[2].word).toBe('all');
      expect(result[3].word).toBe('one');
      expect(result[4].word).toBe('two');
    });

    it('should return an empty result', () => {
      const stopWordArray = ['dude']
      const textArray: IStemmerObject[] = [];

      const result = parser.countAllWordsFromTextThatAreNotStopWords(textArray, stopWordArray)

      expect(result.length).toBe(0);
    });
  });

  describe('showTwentyMostPrevelantWords()', () => {
    it('should return twenty results from a twenty four object array', () => {
      const wordObject = {
        word: 'four',
        stemmerWord: 'four',
        count: 4
      }

      var totalArray = []
      for(var i = 0; i < 24; i++){
        totalArray.push(wordObject);
      }

      var result = parser.showTwentyMostPrevalantWords(totalArray);

      expect(result.length).toBe(20);
    });

    it('should return ten results from a ten object array', () => {
      const wordObject = {
        word: 'four',
        stemmerWord: 'four',
        count: 4
      }

      var totalArray = []
      for(var i = 0; i < 10; i++){
        totalArray.push(wordObject);
      }

      var result = parser.showTwentyMostPrevalantWords(totalArray);

      expect(result.length).toBe(10);
    });

    it('should return empty array from an empty object array', () => {
      var totalArray: IWordCountObject[] = [];

      var result = parser.showTwentyMostPrevalantWords(totalArray);

      expect(result.length).toBe(0);
    });
  });

  describe('convertStemmerBaseWord()', () => {
    it('should convert govern to govern', ()=> {
      const test = ['govern'];

      var result = parser.convertStemmerBaseWord(test);
      expect(result[0].stemmerWord).toEqual('govern');
    });

    it('should convert goverment to govern', ()=> {
      const test = ['government'];

      var result = parser.convertStemmerBaseWord(test);
      expect(result[0].stemmerWord).toEqual('govern');
    });

    it('should convert governments to gover', ()=> {
      const test = ['goverments'];

      var result = parser.convertStemmerBaseWord(test);
      expect(result[0].stemmerWord).toEqual('gover');
    });

    it('should not convert governors to govern', ()=> {
      const test = ['governors'];

      var result = parser.convertStemmerBaseWord(test);
      expect(result[0].stemmerWord).toBe('governor');
    });

    it('should not convert goverment as the regular word', ()=> {
      const test = ['government'];

      var result = parser.convertStemmerBaseWord(test);
      expect(result[0].word).toEqual(test[0]);
    });

    it('should return empty array', ()=> {
      const test = [''];

      var result = parser.convertStemmerBaseWord(test);

      expect(result.length).toEqual(0);
    });
  });
});
