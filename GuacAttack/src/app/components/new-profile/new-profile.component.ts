import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/classes/user.class';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.sass']
})
export class NewProfileComponent implements OnInit {
  user: any
  form: any = {};
  test: any;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }
  save(){
    this.userService.create(this.form);
    this.router.navigate(['/profile', this.form.id]);
  }
  ngOnInit() {
    this.route.paramMap.subscribe(res => this.form['authId'] = res.params.id);
    this.user = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userService.getById(params.get('id')))
    );
  }
}
