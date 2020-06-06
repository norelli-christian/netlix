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
  films:Film[] =[];
  CONFIG = CONFIG
  timeout;
  text:string = '';

  constructor(public service:FilmService,
              public userService: UserService) { }

  ngOnInit(): void {
    this.service.getFilms().subscribe(response =>{
      this.films = response;
    });
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

  /*searchFilm(event){
    this.text = event.target.value.toLowerCase();
    
    //console.log(this.films)

  }*/

  hearth(film){
    this.userService.loggedUser.favoritesFilm.push(film)
  }

  setVote(film:Film, vote:number){
    film.stars = vote
    this.service.editFilm(film).subscribe(response => console.log(response))  }
  
}
