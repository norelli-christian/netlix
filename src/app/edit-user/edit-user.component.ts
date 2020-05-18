import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  users:User;
  constructor(public userService:UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getLoggedUser();
  }

}
