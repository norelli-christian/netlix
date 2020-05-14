import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../models/Film';

@Pipe({
  name: 'filmListFilter'
})
export class FilmListFilterPipe implements PipeTransform {
  timeout;

  transform(value: Film[], ...args: string[]): any{
    let text = args[0]
    

    //console.log(test.length);

    
    if(text.length>=3){
          return value.filter(x => x.title.toLowerCase().indexOf(text) >-1 || x.director.toLowerCase().indexOf(text)>-1|| x.description.toLowerCase().indexOf(text)>-1)
    }else{
          return value
    }
    
    

  }

}
