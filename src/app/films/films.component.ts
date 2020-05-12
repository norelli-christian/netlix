import { Component, OnInit } from '@angular/core';
import { FilmService } from '../Services/film.service';
import { Film } from '../models/film';
import { Actor } from '../models/Actor';
import { Genre } from '../models/Genre';
import {ASSETS_PATH} from '../app.component';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films:Film[];

  ASSETS_PATH = ASSETS_PATH;
  
  constructor(public service:FilmService) { }

  ngOnInit(): void {
    this.films = this.service.getFilms();
  }

  getCastList(cast:Actor[]):string{
    return cast.map(x=> x.fistname +' '+ x.lastname).join(', ');
  }
  getGenreList(genre:Genre[]):string{
    return genre.map(x=> x.name).join(', ');
  }

  selectThisFilm(film:Film):void{
    event.stopPropagation();
    this.service.selectedFilm  = film
  }
}
