import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "src/app/models/user.model";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-new-profile",
  templateUrl: "./new-profile.component.html",
  styleUrls: ["./new-profile.component.sass"]
})
export class NewProfileComponent implements OnInit {
  user: any;
  form: any = {};
  temp: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) {}
  save() {
    this.userService.create(this.form);
    this.router.navigate(["/profile", this.form.id]);
  }
  uploadFile(event) {
    this.storageService.uploadFile(event);
  }
  ngOnInit() {
    this.route.paramMap.subscribe(res => (this.temp = res));
    this.form.id = this.temp.params.id;
    // this.user = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.userService.getById(params.get("id"))
    //   )
    // );
  }
}
