import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.sass"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private storageService: StorageService
  ) {}
  user: any;
  routeId: any;
  temp: any;
  skillCollection: any[] = [];
  editable: boolean = false;
  myProfile: boolean = false;
  profileData: {}
  handleIt(info: any){
    console.log('HANDLING IT...', info);
  }

  saveProfileChanges(){
    console.log("Saving");
  }

  cancelProfileChanges(){
    this.profileData = this.user;
    this.editable = false;
  }
  async ngOnInit() {
    const routeId = this.route.snapshot.params.id;
    if (routeId) {
      this.myProfile = false;
      this.user = await this.userService.getById(routeId);
    } else {
      this.myProfile = true;
      this.user = await this.auth.findMe();
      this.profileData = this.user;
    }
    // await this.storageService.fetchFile(this.user.thumb64Path);
    // await this.storageService.fetchFile(this.user.thumb128Path);
    // await this.storageService.fetchFile(this.user.thumb256Path);
   
    for(let skill of this.user.skills){
       this.skillCollection.push(await this.auth.fetchSkill(skill));
    }
    console.log('TEMP', this.temp);
    console.log('SKILLS', this.user.skills);
    console.log('SKILLSARRAY', this.skillCollection);
    this.auth.addSkillToUser(this.user, "HTML 5");
  }
}
