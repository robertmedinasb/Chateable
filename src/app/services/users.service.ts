import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userList: AngularFireList<any>;
  selectedUser: User = new User();

  constructor(private firebase: AngularFireDatabase) {}

  getUsers() {
    return (this.userList = this.firebase.list('users'));
  }
  signUp(user: User) {
    this.userList.push({
      username: user.$username,
      password: user.$password,
      email: user.$email,
    });
  }
  updateProfile(user: User) {
    this.userList.update(user.$key, {
      username: user.$username,
      password: user.$password,
      email: user.$email,
    });
  }
  deleteProfile($key: string) {
    this.userList.remove($key);
  }
}
