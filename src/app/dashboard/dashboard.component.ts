import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { FilmService } from '../Services/film.service';
import { Film } from '../models/film';

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
    this.filmService.getFilms();
    this.service.getLoggedUser();
    this.lastFilm = this.filmService.getLastFilms();
    this.topFilm = this.filmService.getTopFilms();
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
}
