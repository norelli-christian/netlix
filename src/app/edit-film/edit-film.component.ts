import { Component, OnInit } from '@angular/core';
import { Actor } from '../models/Actor';
import { Genre } from '../models/Genre';
import { FilmService } from '../Services/film.service';
import { GenreService } from '../Services/genre.service';
import { ActorService } from '../Services/actor.service';
import { Film } from '../models/film';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent implements OnInit {

  actors:Actor[];
  genres:Genre[];
  film: Film;
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              public filmService: FilmService,
              private actorService: ActorService,
              private genreService: GenreService
              ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.filmService.getFilms().subscribe(films => {      
      this.film = films.find(x => x.id == id);
      
      this.actorService.getActors().subscribe(actors => {
        this.actors = actors;

        this.actors.map(x => {
          x.selected = this.film.cast.find(y => x.id == y.id) != null; 
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
          x.selected = this.film.genres.find(y => x.id == y.id) != null; 
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
        
    });
}

editFilm() {
  this.film.cast = this.actors.filter(x => x.selected);
  this.film.genres = this.genres.filter(x => x.selected);

  
  this.filmService.editFilm(this.film).subscribe(response => {
    if (response.success) {
      this.router.navigate(['films']);
    }
  })
}
}
