import { Injectable } from '@angular/core';
import { Actor } from '../models/Actor';
import { LocalStorageService } from 'ngx-webstorage';

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

  constructor(public localStorage:LocalStorageService) { }
  actors: Actor[];
  newActor: Actor;
  selectedActor: Actor = {
    id:0,
    fistname:"",
    lastname:""
  };

  getActors(): Actor[]{
    this.actors = this.localStorage.retrieve('actors') || ACTORS;
    return this.actors;
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
