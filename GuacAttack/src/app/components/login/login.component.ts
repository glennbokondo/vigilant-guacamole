import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, public afAuth: AngularFireAuth) {}
  hide = true;
  form = { email: "", password: "" };
  email = new FormControl("", [Validators.required, Validators.email]);
  currentUser: any = {};
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

  login(){
    this.authService.login(this.form.email, this.form.password);
    this.currentUser = this.authService.currentUser2;
  }
  
  async ngOnInit() {
    // await this.authService.currentUser();
    this.loginStatus = this.authService.amIloggedIn();
    this.currentUser = this.authService.currentUser2;
    this.authService.updateProfile();
    this.test = this.authService.showMeUser();
  }
  // register() {
  //   this.afAuth.auth
  //     .createUserWithEmailAndPassword(this.form.email, this.form.password)
  //     .catch(function(error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       if (errorCode == "auth/weak-password") {
  //         alert("The password is too weak.");
  //       } else {
  //         alert(errorMessage);
  //       }
  //       console.log(error);
  //     });
  // }
  // login() {
  //   this.afAuth.auth
  //     .signInWithEmailAndPassword(this.form.email, this.form.password)
  //     .catch(function(error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       if (errorCode === "auth/wrong-password") {
  //         alert("Wrong password.");
  //       } else {
  //         alert(errorMessage);
  //       }
  //       console.log(error);
  //     });
  // }
  // logout() {
  //   this.afAuth.auth.signOut();
  // }
}
