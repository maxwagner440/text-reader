import fs from 'fs'

export class LocalFileReader {

  constructor(){}

  readFile(path: string): string {
    try{
      return fs.readFileSync(path).toString();
    }
    catch(err){
      console.log('!!! Error Within FS!!!');
      return '';
    }
  }
}