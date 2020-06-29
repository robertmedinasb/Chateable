import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users.service';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';

declare const $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userList: User[];

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsers()
      .snapshotChanges()
      .subscribe((user) => {
        this.userList = [];
        user.forEach((element) => {
          let x = element.payload.toJSON();
          x['key'] = element.key;
          this.userList.push(x as User);
        });
      });
  }
  onSubmit(userForm: NgForm) {
    console.log(this.userList);
    this.userList.forEach((user: any) => {
      let username = user.username == userForm.value.$username;
      let password = user.password == userForm.value.$password;
      console.log(username);
      console.log(password);
      if (username && password) {
        localStorage.setItem('currentuser', JSON.stringify(userForm.value));
        return (window.location.href = '/chat');
      }
    });
  }
}
