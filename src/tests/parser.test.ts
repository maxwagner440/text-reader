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
  });

  describe('extractWordsFromText()', () => {
    it('should ', () => {

    });
  });

  describe('countAllWordsFromText()', () => {
    it('should ', () => {

    });
  });

  describe('orderArrayOnCountDesc()', () => {
    it('should ', () => {

    });
  });

  describe('showTwentyMostPrevelantWords()', () => {
    it('should ', () => {

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
  });
});
