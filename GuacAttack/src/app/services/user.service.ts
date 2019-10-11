import { Injectable } from '@angular/core';
import { User } from '../classes/user.class';
import { USERS } from '../components/mock-data/mock-users';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  findById(id: number): Observable<User> {
    return of({
      id: 11,
      username: "QRY91",
      firstName: "Glenn",
      lastName: "Bokondo",
      email: "glennbokondo@gmail.com"
    });
  }
  getUsers(): Observable<User[]> {
    return of(USERS);
  }
}
