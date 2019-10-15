import { Injectable } from "@angular/core";
import { User } from "../classes/user.class";
import { USERS } from "../components/mock-data/mock-users";
import { Observable, of } from "rxjs";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  item: Observable<any>;
  itemList: any;
  database: string = "users";
  complete: any;

  constructor(private db: AngularFireDatabase) {
    this.itemList = this.db.list(this.database);
    this.item = this.db.object(this.database).valueChanges();
  }

  async getAll() {
    return await this.db
      .list<User>(this.database)
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }
  
  async getById(id: string): Promise<any> {
    return await this.db
      .object<User>(this.database + "/" + id)
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }

  create(object: User) {
    object.id = this.db.createPushId();
    let key = this.itemList.push(object).key;
    object.id = key;
    this.itemList.update(key, object);
  }

  update(key: string, newUser: User) {
    this.itemList.update(key, newUser);
  }

  delete(key: string) {
    this.itemList.remove(key);
  }

  deleteAll() {
    this.itemList.remove();
  }

  getUsers(): Observable<User[]> {
    return of(USERS);
  }
}
