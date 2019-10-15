import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}
  hide = true;
  form = { email: "", password: "" };
  email = new FormControl("", [Validators.required, Validators.email]);
  currentUser: any;
  loginStatus: any;
  test: any;


  getErrorMessage() {
    return this.email.hasError("required")
      ? "You must enter a value"
      : this.email.hasError("email")
      ? "Not a valid email"
      : "";
  }

  register(){
    this.authService.register(this.form.email, this.form.password);
  }
  
  async login(){
    await this.authService.login(this.form.email, this.form.password);
    this.currentUser = this.authService.afAuth.auth.currentUser;
    this.router.navigate(['/profile/new', this.currentUser.uid]);
  }
  
  async ngOnInit() {
  }
}
