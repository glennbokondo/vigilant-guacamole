import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.sass']
})
export class ProfileSettingsComponent implements OnInit {
  user: any
  form: any;
  test: any;
  constructor(private userService: UserService, private route: ActivatedRoute) { }
  save(){

    this.userService.create(this.form);
  }
  ngOnInit() {
    this.user = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userService.getById(params.get('id')))
    );
    this.userService.getById("-LrEIDrZpAuYYC_OX4O_").then(res => this.form = res);
    // this.form = new User();
  }

}
