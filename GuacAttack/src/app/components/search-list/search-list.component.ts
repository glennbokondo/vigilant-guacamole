import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.sass']
})
export class SearchListComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  users: any;

  async goToProfile(userID){
    let myself = await this.auth.findMe();
    if(myself.uid === userID){
      this.router.navigate(["/profile"]);
    } else {
      this.router.navigate(["/profile", userID]);
    }
  }

  async ngOnInit() {
    this.users = await this.auth.fetchAllUsers();
  }

}
