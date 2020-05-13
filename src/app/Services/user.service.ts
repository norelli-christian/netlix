import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { LocalStorageService } from 'ngx-webstorage';
const USERS: User[] = [
  {
    id: 1,
    username: 'chris',
    password: 'secret',
    firstname: 'christian',
    lastname: 'norelli',
    favoritesFilm: [{
      title:"Shining",
      description:"Shining rappresenta una tappa dell'itinerario di attraversamento-appropriazione-sfondamento dei generi cinematografici attuata da Kubrick nel corso della sua carriera.",
      director:"Stanley Kubrick",
      duration:"144 min",
      releaseYear:1980,
      stars:3,
      cast:[{
        fistname:"Jack",
        lastname:"Nicholson"
      },
      {
        fistname:"Shelley",
        lastname:"Duvall"
      }],
      genres:[{
        name:"Avventura"  
      }],
      tags:"Tags",
      coverUrl:""
    }]
  },
  {
    id: 2,
    username: 'marco',
    password: 'marchetti',
    firstname: 'marco',
    lastname: 'marchini',
    favoritesFilm: []
  },
];
@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser:User;
  favoritesFilm: [];
  constructor(public localStorage:LocalStorageService) { }

  login(username: string, password: string): boolean {
    this.loggedUser = USERS.find(x => x.username == username && x.password == password);

    this.localStorage.store('loggedUser', this.loggedUser);

    return this.loggedUser != null;
  }

  logout(){
    this.loggedUser = null;
    this.localStorage.clear("loggedUser");
  }

  getLoggedUser(){
    this.loggedUser = this.localStorage.retrieve('loggedUser');
  }
}
