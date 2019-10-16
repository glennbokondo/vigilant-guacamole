import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.sass']
})
export class SearchListComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: any;
  displayedColumns = ['displayName', 'firstName', 'lastName', 'email']
  async getUsers() {
    this.users = await this.userService.getAll();
  }

  createUser(user: User): void {
    this.userService.create(user);
  }

  ngOnInit() {
    this.getUsers();
  }

}
