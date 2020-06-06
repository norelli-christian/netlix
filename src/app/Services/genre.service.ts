import { Injectable } from '@angular/core';
import { Genre } from '../models/Genre';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CONFIG } from '../config';
import { tap } from 'rxjs/operators';
const GENRES: Genre[] = [
  
  {
    id:1,
    name:"Fantascienza"
  },


  {
    id:3,
    name:"Animazione"
  },


  {
    id:8,
    name:"Avventura"
  },

  {
    id:11,
    name:"Biografico"
  },

  {
    id:14,
    name:"Commedia"
  },

  {
    id:15,
    name:"Documentario"
  },

  {
    id:19,
    name:"Drammatico"
  },

  {
    id:22,
    name:"Thriller"
  },

  {
    id:23,
    name:"Western"
  },

  {
    id:25,
    name:"Horror"
  }

];
@Injectable({
  providedIn: 'root'
})
export class GenreService {
  genres: Genre[];
  newGenre: Genre;
  selectedGenre: Genre = {
    id:0,
    name:""
  };

  constructor(public localStorage:LocalStorageService, private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    if (this.genres) {
      return of(this.genres);
    } else {
      return this.http.get<Genre[]>(CONFIG.hostApi + '/genre/read.php').pipe(
        tap(response => this.genres = response),
      );
    }
  }

  addGenres(): void{
    this.genres.push(this.selectedGenre);
    this.localStorage.store('genres', this.genres);
    this.reset();
  }

  reset():void{
    this.selectedGenre =  {
      id:0,
      name:""  
    }
  }

  edit(){   
    this.selectedGenre = null;
    this.localStorage.store('genres', this.genres);
  }
}
