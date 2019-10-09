import { Injectable } from '@angular/core';
import { User } from '../classes/user.class';
import { USERS } from '../components/mock-data/mock-users';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers(): Observable<User>[] {
    return of(USERS);
  }
}
