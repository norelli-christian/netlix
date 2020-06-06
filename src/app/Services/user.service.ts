import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { LocalStorageService } from 'ngx-webstorage';
import { newUser } from '../models/newUser';
const USERS: User[] = [
  {
    id: 1,
    username: 'chris',
    password: 'secret',
    firstname: 'christian',
    lastname: 'norelli',
    favoritesFilm: [{
      id:3,
      title:"Shining",
      description:"Shining rappresenta una tappa dell'itinerario di attraversamento-appropriazione-sfondamento dei generi cinematografici attuata da Kubrick nel corso della sua carriera.",
      director:"Stanley Kubrick",
      duration:"144 min",
      releaseYear:1980,
      stars:3,
      cast:[{
        id:5,
        fistname:"Jack",
        lastname:"Nicholson"
      },
      {
        id:6,
        fistname:"Shelley",
        lastname:"Duvall"
      }],
      genres:[{
        id:3,
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
  users:User[];
  newUsers:newUser[];
  newUser:newUser={
    username:"",
    password:"",
    newFirstname:"",
    newLastname:"",
    newUsername:"",
    newPassword:""
  };

  constructor(public localStorage:LocalStorageService) { }
  error:String = ''
  login(username: string, password: string): boolean {
    this.loggedUser = USERS.find(x => x.username == username && x.password == password);

    this.localStorage.store('loggedUser', this.loggedUser);

    return this.loggedUser != null;
  }

  logout(){
    this.loggedUser = null;
    this.localStorage.clear("loggedUser");
  }

  getLoggedUser():User{
    this.loggedUser = this.localStorage.retrieve('loggedUser');
    return this.loggedUser;
  }

  editUser(){   
    let result = true;
    this.newUser.username = this.loggedUser.username;
    this.newUser.password = this.loggedUser.password;
    if(this.newUser.newFirstname.length == 0 && this.newUser.newLastname.length == 0 && this.newUser.newUsername.length == 0 &&this.newUser.newPassword.length ==0){
      result = false;
      this.error = 'Devi modificare almeno un campo'
    }else{
      this.localStorage.store('newUsers', this.newUser);
      this.error =''
      console.log(this.newUser)
    }

    //console.log(this.newUser)
    }

  /*edit(){   
    this.localStorage.store('films', this.films);
    this.selectedFilm = null;
  }*/
}
