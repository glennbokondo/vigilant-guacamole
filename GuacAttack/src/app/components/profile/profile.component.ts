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
  constructor(private auth: AuthService, private route: ActivatedRoute, private userService: UserService) { }
  user: any;
  routeId: any;
  temp: any;
  async ngOnInit() {
    const routeId = this.route.snapshot.params.id;
    if(routeId){
      this.user = await this.userService.getById(routeId);
    } else {
      this.user = await this.auth.findMe();
    }
  }
}
