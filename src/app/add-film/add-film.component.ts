import { Component, OnInit } from '@angular/core';
import { FilmService } from '../Services/film.service';
import { Actor } from '../models/Actor';
import { ActorService } from '../Services/actor.service';
import { GenreService } from '../Services/genre.service';
import { Genre } from '../models/Genre';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {
  actors:Actor[];
  genres:Genre[];
  constructor(public filmService:FilmService, public actorService:ActorService, public genreService:GenreService) { }

  ngOnInit(): void {
    this.actors = this.actorService.getActors();
    this.genres = this.genreService.getGenres();
  }

}
