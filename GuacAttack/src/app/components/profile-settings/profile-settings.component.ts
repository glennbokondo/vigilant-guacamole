import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/classes/user.class';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.sass']
})
export class ProfileSettingsComponent implements OnInit {
  form: any;
  test: any;
  constructor(private userService: UserService) { }
  save(){

    this.userService.create(this.form);
  }
  ngOnInit() {
    this.userService.getById("-LrEIDrZpAuYYC_OX4O_").then(res => this.form = res);
    // this.form = new User();
  }

}
