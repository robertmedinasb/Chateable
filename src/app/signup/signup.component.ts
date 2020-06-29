import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users.service';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userList: User[];

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    localStorage.clear();
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
    this.userService.signUp(userForm.value);
    localStorage.setItem('currentuser', JSON.stringify(userForm.value));
    window.location.href = '/chat';
  }
}
