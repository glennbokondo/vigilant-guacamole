import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user.class';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.sass']
})
export class SearchListComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[];
  displayedColumns = ['id', 'username', 'firstName', 'lastName', 'email']

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  ngOnInit() {
    this.getUsers();
  }

}
