import { Component, OnInit } from '@angular/core';
import { FilmService } from '../Services/film.service';
import { Film } from '../models/film';
import { Actor } from '../models/Actor';
import { Genre } from '../models/Genre';
import { CONFIG } from '../config';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films:Film[];

  CONFIG = CONFIG

  constructor(public service:FilmService,
              public userService: UserService) { }

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

  searchFilm(event){
    let test = event.target.value.toLowerCase();
    //console.log(test.length);
    if(test.length>=3){
          this.films = this.service.getFilms().filter(x => x.title.toLowerCase().indexOf(test) >-1 || x.director.toLowerCase().indexOf(test)>-1|| x.description.toLowerCase().indexOf(test)>-1)
    }else{
      this.films = this.service.getFilms();
    }

    //console.log(this.films)

  }

  hearth(film){
    this.userService.loggedUser.favoritesFilm.push(film)
  }
  
}
