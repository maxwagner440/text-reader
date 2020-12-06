# Text Reader

This is a console application that reads from a text file, parses based on several requirements and prints out the twenty most frequently occuring strings. The application also reads from a "stop words" text file, parses these words, and then removes these words from the original text file read. After the application filters on stop words, it then computes the frequency of how many times each word occurs in the text file and then prints out the twenty most occurring words. The application also uses a stemming algorithm that takes every word and creates a stemmed version of that word. The console log will actually print the word, the stemmed word version and the frequency it occurs in the text.


```
Stemming: "punching", "punched" and "puncher" all equate to "punch" when stemmed.
```

## Assumptions Made:
  - The stop words file provided words separated by new line characters. After parsing these words, the application then normalizes the word by removing any non-alphabetic characters.
  - Within the stop words file there was an extra tab in front of one of the words. I assumed something like that was a user error and therefore filtered on non-alphabetic words.
  - While the requirements for this application did say to remove the stop words from the text, it did not say to rewrite the text file without those words so the application does not rewrite a new text file.
  - We can't always assume the user will provide a good file reference or even a file that is not empty, therefore the application handles those scenario in the app.ts file.
  - There can be much more done to this application like adding a user interface that allows for a lot more customizations.
  
  
 
### Prerequisites:
  - [Typescript](https://www.typescriptlang.org/) installed
  - [NodeJS](https://nodejs.org/en/download/) installed
  - After NodeJS has successfully been install, you can use npm to install these packages:
      - [npx](https://www.npmjs.com/package/npx)
      - [ts-node](https://www.npmjs.com/package/ts-node)
      
    
### To Install:
 - clone the project
 
 ```
 cd text-reader/src (where the package.json file lives)
 npm install
 ```
 
 
### To Run:

Note: The application pulls text files from the /examples folder. You can add files here and then update the app-config.json file with the text file name. The stop words file reference is "stopWordsFilePath" and the text file reference is "textFilePath".


```
cd text-reader/src/main (where the app.ts file lives)
npx ts-node app.ts
```


### To Test: 

```
cd text-reader/src (where the package.json file lives)
npm test
```
