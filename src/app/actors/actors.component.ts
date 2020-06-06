import { Component, OnInit } from '@angular/core';
import { Actor } from '../models/Actor';
import { ActorService } from '../Services/actor.service';
import { FilmService } from '../Services/film.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {
  actors: Actor[];
  constructor(private actorService: ActorService, private filmService: FilmService) { }

  ngOnInit() {
    this.actorService.getActors().subscribe(response => {
      this.actors = response;
      
      this.filmService.getFilms().subscribe(films => {
        this.actors.map(actor => {
          actor.films = films.filter(film => film.cast.find(x => x.id == actor.id) != null);
          return actor;
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
    });
  }

}
