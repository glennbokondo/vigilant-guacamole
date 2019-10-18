import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.sass']
})
export class ProfileSettingsComponent implements OnInit {
  user: User;
  form: any;
  test: any;
  newUser: boolean = false;
  constructor(private route: ActivatedRoute, public auth: AuthService, public userService: UserService) { }
  save(){
    this.auth.updateProfile
  }
  async ngOnInit() {
    const routeId = this.route.snapshot.params.id;
    if(routeId){
      this.newUser = true;
      this.user = await this.userService.getById(routeId);
    } else {
      this.user = await this.auth.findMe();
    }
  }

}
