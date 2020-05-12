import { Injectable } from '@angular/core';
import { Film } from '../models/Film';
import { ActorService } from './actor.service';
import { LocalStorageService } from 'ngx-webstorage';
import { CONFIG } from '../config';
import { config } from 'rxjs';


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
    tags:"Tags",
    coverUrl:CONFIG.assetsPath+"images/ilpadrino.png"
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
    tags:"Tags",
    coverUrl:CONFIG.assetsPath+"images/squalo.jpg"
  },

  {
    title:"Shining",
    description:"Shining rappresenta una tappa dell'itinerario di attraversamento-appropriazione-sfondamento dei generi cinematografici attuata da Kubrick nel corso della sua carriera.",
    director:"Stanley Kubrick",
    duration:"144 min",
    releaseYear:1980,
    stars:3,
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
    tags:"Tags",
    coverUrl:CONFIG.assetsPath+"images/shining.jpg"
  },

  {
    title:"Il Signore degli Anelli - La Compagnia dell'Anello",
    description:"Nel prologo del film si narra della Seconda Era, in cui sono stati forgiati gli anelli, spiegando come lo hobbit Bilbo Baggins sia infine entrato in possesso dell'Unico Anello.",
    director:"Peter Jackson",
    duration:"178 min",
    releaseYear:2001,
    stars:2,
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
    tags:"Tags",
    coverUrl:CONFIG.assetsPath+"images/anelli.jpg"
  }


  

];
@Injectable({
  providedIn: 'root'
})
export class FilmService {
  films:Film[];
  newFilm: Film ={
    title:"",
    description:"",
    director:"",
    duration:"",
    releaseYear:0,
    stars:0,
    cast: null,
    genres:null,
    tags:"",
    coverUrl:""
  };
  selectedFilm: Film;

  constructor(public localStorage:LocalStorageService) { }


  getFilms(): Film[]{
    this.films = this.localStorage.retrieve('films') || FILMS;
    return this.films;
  }

  addFilms(): void{
    if(!this.films){
      this.getFilms();
    }
    this.films.push(this.newFilm);
    this.localStorage.store('films', this.films);
    this.newFilm =  {
      title:"",
      description:"",
      director:"",
      duration:"",
      releaseYear:0,
      stars:0,
      cast: [],
      genres:[],
      tags:"",
      coverUrl:""
    }
  }


  edit(){   
    this.localStorage.store('films', this.films);
    this.selectedFilm = null;
  }

  getLastFilms():Film[]{
    
    return this.films.slice(0, 4);
  }

  getTopFilms():Film[]{
    return this.films.sort(function(film1, film2){
      if (film1.stars > film2.stars)
          return -1;
      if (film1.stars < film2.stars)
          return 1;
      return 0
  }).slice(0,3);
  }
}
