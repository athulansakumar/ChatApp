import { Component, OnInit } from '@angular/core';

import { User } from '../models/user-model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    user: User = new User();
    errorMessage : string = "";

    constructor(private userService:UserService) { }

    ngOnInit() {
    }

    signUp() {
        this.userService.addNewUser(this.user).subscribe((res)=>{
            if(res.status=='ok'){
                this.errorMessage="Sign up Completed";
            }else{
                this.errorMessage="Sign up Failed";
            }

        },(e) => {
            console.log(e);
        });
    }
}
