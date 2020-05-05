import { Injectable } from '@angular/core';
import { Film } from '../models/Film';
import { ActorService } from './actor.service';
import { LocalStorageService } from 'ngx-webstorage';

const FILMS: Film[] = [
  
  {
    title:"Il padrino",
    description:"Il film è ambientato a New York in pieno dopoguerra, tra la fine degli anni 1940 e la prima metà degli anni 1950. Il protagonista è don Vito Corleone, capo di una famiglia mafiosa divenuta col tempo una delle più potenti organizzazioni criminali della Grande Mela, grazie al rispetto e all'onorabilità ottenute dal patriarca e dai figli coinvolti nelle attività malavitose. Quando don Vito rimane vittima di un attentato da parte di un boss rivale, il figlio Michael Corleone comincia l'ascesa nell'impero criminale della famiglia, fino a diventare il nuovo ",
    director:"Francis Ford Coppola",
    duration:"175 min",
    releaseYear:1972,
    stars:5,
    cast:[{
      fistname:"Daniel",
      lastname:"Radcliffe"
    },
  
  
    {
      fistname:"Will",
      lastname:"Smith"
    }],
    genres:[{
      name:"Fantascienza"  
    }],
    tags:"Tags"
  },

  {
    title:"Lo squalo",
    description:"Racconta di un grande e pericoloso squalo bianco che uccide dei bagnanti sull'isola di Amity, un immaginario luogo di villeggiatura estiva, spingendo il capo della polizia locale a cercare di ucciderlo con l'aiuto di un biologo marino e un cacciatore di squali.",
    director:"Steven Spielberg",
    duration:"124 min",
    releaseYear:1975,
    stars:4,
    cast:[{
      fistname:"Peter",
      lastname:"Benchley"
    },
    {
      fistname:"Robert",
      lastname:"Shaw"
    }],
    genres:[{
      name:"Avventura"  
    }],
    tags:"Tags"
  },

  {
    title:"Shining",
    description:"Shining rappresenta una tappa dell'itinerario di attraversamento-appropriazione-sfondamento dei generi cinematografici attuata da Kubrick nel corso della sua carriera.",
    director:"Stanley Kubrick",
    duration:"144 min",
    releaseYear:1980,
    stars:4,
    cast:[{
      fistname:"Jack",
      lastname:"Nicholson"
    },
    {
      fistname:"Shelley",
      lastname:"Duvall"
    }],
    genres:[{
      name:"Avventura"  
    }],
    tags:"Tags"
  },

  {
    title:"Il Signore degli Anelli - La Compagnia dell'Anello",
    description:"Nel prologo del film si narra della Seconda Era, in cui sono stati forgiati gli anelli, spiegando come lo hobbit Bilbo Baggins sia infine entrato in possesso dell'Unico Anello.",
    director:"Peter Jackson",
    duration:"178 min",
    releaseYear:2001,
    stars:4,
    cast:[{
      fistname:"Elijah",
      lastname:"Wood"
    },
    {
      fistname:"Ian",
      lastname:"McKellen"
    }],
    genres:[{
      name:"Avventura"  
    }],
    tags:"Tags"
  }


  

];
@Injectable({
  providedIn: 'root'
})
export class FilmService {
  films:Film[];
  newFilm: Film;
  selectedFilm: Film = {
    title:"",
    description:"",
    director:"",
    duration:"",
    releaseYear:0,
    stars:0,
    cast: null,
    genres:null,
    tags:""
  };
  constructor(public localStorage:LocalStorageService) { }

  getFilms(): Film[]{
    this.films = this.localStorage.retrieve('films') || FILMS;
    return this.films;
  }

  addFilms(): void{
    this.films.push(this.selectedFilm);
    this.localStorage.store('films', this.films);
    this.reset();
  }

  reset():void{
    this.selectedFilm =  {
      title:"",
      description:"",
      director:"",
      duration:"",
      releaseYear:0,
      stars:0,
      cast: null,
      genres:null,
      tags:""
    }
  }

  edit(){   
    this.selectedFilm = null;
    this.localStorage.store('films', this.films);
  }
}