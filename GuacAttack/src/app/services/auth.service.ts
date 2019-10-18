import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../app/models/user.model";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap, take, map, first } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<User>;
  user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
  }

  async findMe() {
    const user = await this.afAuth.authState.pipe(first()).toPromise();

    // Logged in
    if (user) {
      return await this.afs
        .doc<User>(`users/${user.uid}`)
        .get()
        .pipe(
          take(1),
          map(req =>req.data() as User)
        )
        .toPromise();
    }
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
      });
      this.router.navigate(["/profile-settings"]);
  }

  async signIn(email: string, password: string) {
    const credential = await this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
      });
    if (credential) {
      this.router.navigate(["/profile-settings", credential.user.uid]);
      return this.updateUserData(credential.user);
    }
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data, { merge: true });
  }

  fetchUserData(uid: string) {
    var userRef = this.afs.collection("users").doc(uid);
    userRef.get().subscribe(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(["/login"]);
  }

  updateProfile(payload?: any) {
    var user = this.afAuth.auth.currentUser;
    user
      .updateProfile({
        ...payload,
        displayName: "QRY91"
      })
      .then(function() {})
      .catch(function(error) {});
  }
}
