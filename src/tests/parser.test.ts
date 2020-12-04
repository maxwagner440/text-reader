import { Parser } from "../parser";

describe('parser', () => {
  let parser: Parser;

  beforeEach( () => {
    parser = new Parser();
  });



  describe('parseTextWordsBasedSpace()', () => {
    it('should parse a string into a string array based on spaces', () => {
      const sixWordString = 'hey you I have an idea'
      const result = parser.parseTextWordsBasedSpace(sixWordString);

      expect(result.length).toBe(6);
    });
  });
  
  describe('parseStopWordsBasedOnLineBreak()', () => {
    
  });

  describe('normalizeWords()', () => {

  });

  describe('extractWordsFromText()', () => {

  });

  describe('countAllWordsFromText()', () => {

  });

  describe('orderArrayOnCountDesc()', () => {

  });

  describe('showTwentyMostPrevelantWords()', () => {
    
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
