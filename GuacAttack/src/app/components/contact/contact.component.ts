import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  form: any = {}
  sendMessage: string = "You've just sent an e-mail to North-Korea. Good luck!"
  lat = 39.052178;
  lng = 125.783625;

  constructor(private _snackBar: MatSnackBar) { }
  openSnackBar() {
    this._snackBar.open(this.sendMessage, "Thanks...", {duration: 3000});
  }

  ngOnInit() {
  }

}
