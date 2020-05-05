import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser:User;
  constructor(public localStorage:LocalStorageService) { }

  login(){
    this.loggedUser={
      id:1,
      firstname:"Christian",
      lastname:"Norelli",
      favoritesFilm:[]
    }
  }
  save(){
    this.localStorage.store('users', this.loggedUser);
  }

  logout(){
    this.loggedUser = null;
    this.localStorage.clear("loggedUser");
  }

  getLoggedUser(){
    this.loggedUser = this.localStorage.retrieve('loggedUser');
  }
}
