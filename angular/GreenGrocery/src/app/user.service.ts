import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  constructor() {}

  register(user: User): Observable<User> {
    this.users.push(user);
    return of(user);
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}