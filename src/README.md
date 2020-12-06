# Text Reader

This is a console application that reads text from a text file, parses based on several requirements and prints out the twenty most frequently occuring strings. The application also reads from a "stop words" text file, parses these words, and then removes these words from the original text file read. After the application filters on stop words, it then computes the frequency of how many times each word occurs in the text file and then prints out the twenty most occuring word. It also uses a stemming algorithm that takes every word and creates a stemmed version of that word.

For example if "punching", "punched" and "puncher" all existed in the file, their stemmed word would all be "punch".

## Assumptions Made:
  - The stop words file provided words separated by new line characters. After parsing these words, the application then normalizes the word by removing any non-alphabetic characters.
  - Within the stop words file there was an extra tab in front of one of the words. I assumed something like that was a user error and therefore filtered on non-alphabetic words.
  - While the requirements for this application did say to remove the stop words from the text, it did not say to rewrite the text file without those words so the application does not rewrite a new text file.
  - We can't always assume the user will provide a good file reference or even a file that is not empty, therefore the application handles those scenario in the app.ts file.
  - There can be much more done to this application like adding a user interface that allows for a lot more customizations.
  
# Prerequisites:
  Have to have Typescript installed : https://www.typescriptlang.org/
  Have to have NodeJS installed : https://nodejs.org/en/download/
  (May have to install npx and ts-node after NodeJS)
    npx: https://www.npmjs.com/package/npx
    ts-node: https://www.npmjs.com/package/ts-node

# To Install:
 - clone the project
 - cmd: cd text-reader/src/ (where the package.json file lives)
 - cmd: npm install
 
# To Run:

- cmd: cd text-reader/src/main (where the app.ts file lives)
- cmd: npx ts-node app.ts

# To Test: 

- cmd: cd text-reader/src
- cmd: npm test
