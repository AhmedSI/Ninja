import { Component, OnInit } from '@angular/core';
import { User } from '.././User';
import { NgModule } from '@angular/core';
import { UserServiceService } from '.././user-service.service';
import {NgForm} from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  newUser: User = new User();
  token: string = "initial";
  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }
  enterUser(loginForm: NgForm): void {
     console.log(loginForm.value);
    this.userService.loginUser(loginForm.value.email,loginForm.value.password)
      .then(accesstoken => {        
        loginForm.reset();
        // this.token = accesstoken.substring(30,accesstoken.length);
        this.token=accesstoken;
        localStorage.setItem('token', this.token);
        console.log(this.token);
        this.router.navigate(['/home']);
      });
  }

}
