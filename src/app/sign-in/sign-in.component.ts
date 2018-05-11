import { Component, OnInit } from '@angular/core';

import { User } from '../models/user-model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    user:User = new User();
    errorMessage:string;

  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  signIn() {
      this.userService.signIn(this.user).subscribe((res) => {
          if(res && res.status=='ok'){
              this.errorMessage='Signed in';
          }else{
              this.errorMessage='Username or password is incorrect.';
          }
      });
  }
}
