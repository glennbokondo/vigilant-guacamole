import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) {}
  logout() {
    this.afAuth.auth.signOut();
  }
  ngOnInit() {
  }

}
