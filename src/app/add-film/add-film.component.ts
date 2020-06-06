import { Component, OnInit } from '@angular/core';
import { FilmService } from '../Services/film.service';
import { Actor } from '../models/Actor';
import { ActorService } from '../Services/actor.service';
import { GenreService } from '../Services/genre.service';
import { Genre } from '../models/Genre';
import { Router } from '@angular/router';
import { Film } from '../models/film';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {
  actors:Actor[];
  genres:Genre[];
  film: Film;

  constructor(private router: Router,public filmService:FilmService, public actorService:ActorService, public genreService:GenreService) { }

  ngOnInit() {
    this.resetFilm();
    
    this.actorService.getActors().subscribe(actors => {
      this.actors = actors;
      
      this.actors.map(x => {
        x.selected = false;
        return x;
      });
      this.actors.map(x => {
        x.selected = false;
        return x;
      });


      this.actors.sort((a, b) => {
        let nameA = (a.fistname + ' ' + a.lastname).toUpperCase();
        let nameB = (b.fistname + ' ' + b.lastname).toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      });
    });
    
    this.genreService.getGenres().subscribe(genres => {
    this.genres = genres;

    this.genres.map(x => {
      x.selected = false;
      return x;
    });

      this.genres.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return 1;
        }
      });
    });  
  }
  
  resetFilm(): void {
    this.film = {
      title: '',
      description: '',
      director: '',
      duration: '',
      releaseYear: 0,
      stars: 0,
      cast: [],
      genres: [],
      tags: '',
      coverUrl:''
    }
  }
  
  addFilm() {
      this.film.cast = this.actors.filter(x => x.selected);
      this.film.genres = this.genres.filter(x => x.selected);
      
      this.filmService.addFilm(this.film).subscribe(response => {
      if (response.success) {
        this.router.navigate(['films']);
      }
    })
  }

}
