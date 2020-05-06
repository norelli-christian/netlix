import { Component, OnInit } from '@angular/core';
import { Actor } from '../models/Actor';
import { Genre } from '../models/Genre';
import { FilmService } from '../Services/film.service';
import { GenreService } from '../Services/genre.service';
import { ActorService } from '../Services/actor.service';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent implements OnInit {

  actors:Actor[];
  genres:Genre[];
  constructor(public filmService:FilmService, public actorService:ActorService, public genreService:GenreService) { }

  ngOnInit(): void {
    this.actors = this.actorService.getActors();
    this.genres = this.genreService.getGenres();
  }

}
