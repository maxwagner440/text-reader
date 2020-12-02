import fs from 'fs'

export class LocalFileReader {

  constructor(){}

  //read file based on folder/file
  readFile(path: string): string {
    try{
      return fs.readFileSync(path).toString();
    }
    catch(err){
      return ''
      console.log('error: ', err);
    }
    
  }
}