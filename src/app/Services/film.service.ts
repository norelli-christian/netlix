import { Injectable } from '@angular/core';
import { Film } from '../models/Film';
import { ActorService } from './actor.service';
import { LocalStorageService } from 'ngx-webstorage';
import { CONFIG } from '../config';
import { config, Observable, of } from 'rxjs';
import { tap, catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';


const FILMS: Film[] = [
  
  {
    id:1,
    title:"Il padrino",
    description:"Il film è ambientato a New York in pieno dopoguerra, tra la fine degli anni 1940 e la prima metà degli anni 1950. Il protagonista è don Vito Corleone, capo di una famiglia mafiosa divenuta col tempo una delle più potenti organizzazioni criminali della Grande Mela, grazie al rispetto e all'onorabilità ottenute dal patriarca e dai figli coinvolti nelle attività malavitose. Quando don Vito rimane vittima di un attentato da parte di un boss rivale, il figlio Michael Corleone comincia l'ascesa nell'impero criminale della famiglia, fino a diventare il nuovo ",
    director:"Francis Ford Coppola",
    duration:"175 min",
    releaseYear:1972,
    stars:5,
    cast:[{
      id:5,
      fistname:"Daniel",
      lastname:"Radcliffe"
    },
  
  
    {
      id:7,
      fistname:"Will",
      lastname:"Smith"
    }],
    genres:[{
      id:10,
      name:"Fantascienza"  
    }],
    tags:"Tags",
    coverUrl:CONFIG.assetsPath+"images/ilpadrino.png"
  },

  {
    id:4,
    title:"Lo squalo",
    description:"Racconta di un grande e pericoloso squalo bianco che uccide dei bagnanti sull'isola di Amity, un immaginario luogo di villeggiatura estiva, spingendo il capo della polizia locale a cercare di ucciderlo con l'aiuto di un biologo marino e un cacciatore di squali.",
    director:"Steven Spielberg",
    duration:"124 min",
    releaseYear:1975,
    stars:4,
    cast:[{
      id:11,
      fistname:"Peter",
      lastname:"Benchley"
    },
    {
      id:15,
      fistname:"Robert",
      lastname:"Shaw"
    }],
    genres:[{
      id:21,
      name:"Avventura"  
    }],
    tags:"Tags",
    coverUrl:CONFIG.assetsPath+"images/squalo.jpg"
  },

  {
    id:10,
    title:"Shining",
    description:"Shining rappresenta una tappa dell'itinerario di attraversamento-appropriazione-sfondamento dei generi cinematografici attuata da Kubrick nel corso della sua carriera.",
    director:"Stanley Kubrick",
    duration:"144 min",
    releaseYear:1980,
    stars:3,
    cast:[{
      id:33,
      fistname:"Jack",
      lastname:"Nicholson"
    },
    {
      id:44,
      fistname:"Shelley",
      lastname:"Duvall"
    }],
    genres:[{
      id:24,
      name:"Avventura"  
    }],
    tags:"Tags",
    coverUrl:CONFIG.assetsPath+"images/shining.jpg"
  },

  {
    id:12,
    title:"Il Signore degli Anelli - La Compagnia dell'Anello",
    description:"Nel prologo del film si narra della Seconda Era, in cui sono stati forgiati gli anelli, spiegando come lo hobbit Bilbo Baggins sia infine entrato in possesso dell'Unico Anello.",
    director:"Peter Jackson",
    duration:"178 min",
    releaseYear:2001,
    stars:2.5,
    cast:[{
      id:55,
      fistname:"Elijah",
      lastname:"Wood"
    },
    {
      id:77,
      fistname:"Ian",
      lastname:"McKellen"
    }],
    genres:[{
      id:25,
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
    id:0,
    title:"",
    description:"",
    director:"",
    duration:"",
    releaseYear:0,
    stars:0,
    cast: null,
    genres:null,
    tags:"",
    coverUrl:/*CONFIG.assetsPath+"images/anelli.jpg"*/""
  };
  selectedFilm: Film;
  

  constructor(
    public localStorage:LocalStorageService,
    private http:HttpClient,
    private userService:UserService) { }


  getFilms(): Observable<Film[]>{
    //this.films = this.localStorage.retrieve('films') || FILMS;
    //return this.films;

    return this.http.get<Film[]>('http://netflix.cristiancarrino.com/film/read.php').pipe(
      //tap()
    );  
  }

  addFilm(film: Film): Observable<any> {
    let loggedUser = this.userService.getLoggedUser();

    if (!loggedUser) {
      alert('please login');
      return;
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': loggedUser.token
      })
    };
    
    return this.http.post<any>(CONFIG.hostApi + '/film/create.php', film, httpOptions).pipe(
      tap(response => {
        if (response.success) {
          if (this.films) {
            film.id = response.id;
            this.films.push(film);
          } else {
            this.getFilms().subscribe();
          }
        }
      }),
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return of(false);
      })
    );
  }
  
  editFilm(film: Film): Observable<any> {
    let loggedUser = this.userService.getLoggedUser();

    if (!loggedUser) {
      alert('please login');
      return;
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': loggedUser.token
      })
    };

    return this.http.post<any>(CONFIG.hostApi + '/film/update.php', film, httpOptions).pipe(
      tap(response => {
        console.log(response);
        if (response.success) {
          if (this.films) {
            let filmToEdit = this.films.find(x => x.id == film.id);
            filmToEdit = film;
          } else {
            this.getFilms().subscribe();
          }
        }
      }),
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return of(false);
      })
    );
  }
  removeFilm(film: Film): Observable<any> {
    let loggedUser = this.userService.getLoggedUser();
    
    if (!loggedUser) {
      alert('please login');
      return;
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': loggedUser.token
      })
    };

    return this.http.post<any>(CONFIG.hostApi + '/film/delete.php', { id: film.id }, httpOptions).pipe(
      tap(response => {
        if (response.success) {
          if (this.films) {
            this.films = this.films.filter(x => x.id != film.id);
          } else {
            this.getFilms().subscribe();
          }
        }
      }),
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return of(false);
      })
    );
  }
  

  getLastFilms(films:Film[]):Film[]{
    
    return films.slice(-4)
  }

  getTopFilms(films:Film[]):Film[]{
    return films.sort(function(film1, film2){
      if (film1.stars > film2.stars)
          return -1;
  }).slice(0,3);
  }
}
