import { Injectable } from '@angular/core';
import { Genre } from '../models/Genre';
import { LocalStorageService } from 'ngx-webstorage';
const GENRES: Genre[] = [
  
  {
    name:"Fantascienza"
  },


  {
    name:"Animazione"
  },


  {
    name:"Avventura"
  },

  {
    name:"Biografico"
  },

  {
    name:"Commedia"
  },

  {
    name:"Documentario"
  },

  {
    name:"Drammatico"
  },

  {
    name:"Thriller"
  },

  {
    name:"Western"
  },

  {
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
    name:""
  };

  constructor(public localStorage:LocalStorageService) { }

  getGenres(): Genre[]{
    this.genres = this.localStorage.retrieve('genres') || GENRES;
    return this.genres;
  }

  addGenres(): void{
    this.genres.push(this.selectedGenre);
    this.localStorage.store('genres', this.genres);
    this.reset();
  }

  reset():void{
    this.selectedGenre =  {
      name:""  
    }
  }

  edit(){   
    this.selectedGenre = null;
    this.localStorage.store('genres', this.genres);
  }
}
