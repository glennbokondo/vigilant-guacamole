import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { StorageService } from 'src/app/services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private storageService: StorageService,
    private _snackBar: MatSnackBar
  ) { }

  newContactLink: any = {
    label: '',
    url: ''
  };
  user: any;
  routeId: any;
  temp: any;
  selectedSkills: any[];
  skillCollection: any[] = [];
  editable: boolean = false;
  myProfile: boolean = false;
  profileData: {};
  handleIt(info: any) {
    console.log('HANDLING IT...', info);
    this.selectedSkills = info;
    console.log('SELECTED SKILLS ARE...', this.selectedSkills);
  }

  saveSkillChanges(){
    console.log('saving skill changes');
  }
  async saveProfileChanges(input) {
    console.log("Saving", input);
    await this.auth.setUserData(this.user, this.profileData);
    this.openSnackBar("Profile changes saved!", "OK");
  }

  cancelProfileChanges() {
    this.profileData = {...this.user};
    this.editable = false;
  }

  saveContactLinkChanges() {
    this.profileData["contactLinks"].push({...this.newContactLink});
    this.newContactLink.label = '';
    this.newContactLink.url = '';
    this.openSnackBar("Link added, don't forget to save your changes!", "OK");
  }
  removeContactLink(input: any) {
    const index = this.profileData["contactLinks"].findIndex(link => link.url === input.url);
    this.profileData["contactLinks"].splice(index, 1);
  }

  openSnackBar(sendMessage, actionMessage?) {
    this._snackBar.open(sendMessage, actionMessage, {duration: 3000});
  }
  async ngOnInit() {
    this.newContactLink = {
      label: '',
      url: ''
    }
    const routeId = this.route.snapshot.params.id;
    if (routeId) {
      this.myProfile = false;
      this.user = await this.userService.getById(routeId);
    } else {
      this.myProfile = true;
      this.user = await this.auth.findMe();
      this.profileData = {...this.user};
    }
    for (let skill of this.user.skills) {
      this.skillCollection.push(await this.auth.fetchSkill(skill));
    }
    console.log('TEMP', this.temp);
    console.log('SKILLS', this.user.skills);
    console.log('SKILLSARRAY', this.skillCollection);
  }
}
