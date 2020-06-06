import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { FilmService } from '../Services/film.service';
import { Film } from '../models/film';
import { User } from '../models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lastFilm : Film[];
  topFilm: Film[];

  username: string;
  password: string;
  successLogin: boolean;
  constructor(public service: UserService,
              public filmService: FilmService
     ) { }

  ngOnInit(): void {
    this.filmService.getFilms().subscribe(response =>{
      this.lastFilm = this.filmService.getLastFilms(response);
      this.topFilm = this.filmService.getTopFilms(response);

    })
    this.service.getLoggedUser();
  }
  login() {
    this.successLogin = this.service.login(this.username, this.password);
  }

  hearth(film){
    console.log("INIZIO")
    console.log(this.service.loggedUser.favoritesFilm)
    this.service.loggedUser.favoritesFilm.push(film)

    console.log("DOPO PUSH")


  }

  selectThisUser(user:User):void{
    event.stopPropagation();
    this.service.loggedUser  = user;
  }
}
