import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}
  currentUser2: any;
  currentUser(){
    return {...this.currentUser2};
  }
  amIloggedIn(){
    if(this.afAuth.user){
      return true;
    } else {
      return false;
    }
  }
  showMeUser(){
    return this.afAuth.user;
  }
  register(email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    this.currentUser2 = this.afAuth.auth.currentUser;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  updateProfile(payload?: any) {
    var user = this.afAuth.auth.currentUser;
    user.updateProfile({
      ...payload,
      displayName: "QRY91"
    }).then(function() {

    }).catch(function(error) {

    });
  }
}
