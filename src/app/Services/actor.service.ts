import { Injectable } from '@angular/core';
import { Actor } from '../models/Actor';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { CONFIG } from '../config';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const ACTORS: Actor[] = [
  
  {
    id:1,
    fistname:"Daniel",
    lastname:"Radcliffe"
  },


  {
    id:3,
    fistname:"Will",
    lastname:"Smith"
  },


  {
    id:5,
    fistname:"Leonardo",
    lastname:"DiCaprio"
  }

];
@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(public localStorage:LocalStorageService,
              private http: HttpClient) { }
  actors: Actor[];
  newActor: Actor;
  selectedActor: Actor = {
    id:0,
    fistname:"",
    lastname:""
  };

  getActors(): Observable<Actor[]> {
    if (this.actors) {
      return of(this.actors);
    } else {
      return this.http.get<Actor[]>(CONFIG.hostApi + '/actor/read.php').pipe(
        tap(response => this.actors = response),
      );
    }
  }

  addActors(): void{
    this.actors.push(this.selectedActor);
    this.localStorage.store('actors', this.actors);
    this.reset();
  }

  reset():void{
    this.selectedActor =  {
      id:0,
      fistname:"",
      lastname:""
    }
  }

  edit(){   
    this.selectedActor = null;
    this.localStorage.store('actors', this.actors);
  }
}
