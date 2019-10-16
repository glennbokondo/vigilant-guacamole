import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute) { }
  user: any;
  routeId: any;
  temp: any;
  async ngOnInit() {
    this.route.paramMap.subscribe(res => (this.temp = res));
    this.routeId = this.temp.params.id;
    this.user = await this.userService.getById(this.routeId);
  }
}
