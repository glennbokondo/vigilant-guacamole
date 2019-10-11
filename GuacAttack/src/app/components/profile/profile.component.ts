import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user.class';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService) { }
  user: User;
  getUser(): void {
    this.userService.findById(99999999999999).subscribe(user => this.user = user);
  }
  ngOnInit() {
    this.getUser();
  }

}
