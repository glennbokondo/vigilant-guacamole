import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import {  ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.sass"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  newContactLink: any = {
    label: '',
    url: ''
  };
  user: any;
  routeId: any;
  selectedSkills: any[];
  skillCollection: any[] = [];
  editable: boolean = false;
  myProfile: boolean = false;
  profileData: {};

  reg: any;

  public urlForm: FormGroup;
  validationGroup = new FormGroup({
    url: new FormControl('', [
      Validators.required,
      Validators.pattern(this.reg)
    ])
  })

  hasError = (controlName: string, errorName: string) => {
    return this.urlForm.controls[controlName].hasError(errorName);
  }

  updateSelectedSkills(info: any) {
    this.selectedSkills = info;
  }

  saveSkillChanges() {
    for (let skill of this.selectedSkills) {
      this.profileData["skills"].push(skill)
    }
  }

  async saveProfileChanges(input) {
    await this.auth.setUserData(this.user, this.profileData);
    this.editable = false;
    this.openSnackBar("Profile changes saved!", "OK");
  }

  cancelProfileChanges() {
    this.profileData = { ...this.user };
    this.editable = false;
  }

  saveContactLinkChanges() {
    if (!this.urlForm.valid) {
      return this.openSnackBar("Could not save: invalid URL", "OK")
    }
    this.profileData["contactLinks"].push({ ...this.newContactLink });
    this.newContactLink.label = '';
    this.newContactLink.url = '';
    this.openSnackBar("Link added, don't forget to save your changes!", "OK");
  }

  removeContactLink(input: any) {
    const index = this.profileData["contactLinks"].findIndex(link => link.url === input.url);
    this.profileData["contactLinks"].splice(index, 1);
  }

  removeSkill(input: any) {
    const index = this.profileData["skills"].findIndex(skill => skill.name === input.name);
    this.profileData["skills"].splice(index, 1);
  }

  openSnackBar(sendMessage, actionMessage?) {
    this._snackBar.open(sendMessage, actionMessage, { duration: 3000 });
  }

  async ngOnInit() {
    this.reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.urlForm = new FormGroup({
      url: new FormControl('', [
        Validators.required,
        Validators.pattern(this.reg)
      ])
    })
    this.newContactLink = {
      label: '',
      url: ''
    }
    const routeId = this.route.snapshot.params.id;
    if (routeId) {
      this.myProfile = false;
      this.user = await this.auth.findUserById(routeId);
    } else {
      this.myProfile = true;
      this.user = await this.auth.findMe();
      this.profileData = { ...this.user };
    }
    for (let skill of this.user.skills) {
      this.skillCollection.push(await this.auth.fetchSkill(skill));
    }
  }
}
