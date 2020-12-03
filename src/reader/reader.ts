import fs from 'fs'

export class LocalFileReader {

  constructor(){}

  //read file based on folder/file
  readFile(path: string): string {
    try{
      return fs.readFileSync(path).toString();
    }
    catch(err){
      console.log('error: ', err);
      return ''
    }
    
  }
}