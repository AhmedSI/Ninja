import { Component ,Input, OnInit } from '@angular/core';
import { User } from './User';
import { NgModule } from '@angular/core';
import { UserServiceService } from './user-service.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  newUser: User = new User();
  token: string = "initial";
  constructor(
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  addUser(userForm: NgForm): void {
    this.userService.registerUser(this.newUser)
      .then(createUser => {        
        userForm.reset();
        this.newUser = new User();
      });
  }
  enterUser(loginForm: NgForm): void {
  
    this.userService.loginUser(loginForm.value.email,loginForm.value.password)
      .then(accesstoken => {        
        loginForm.reset();
        this.token = accesstoken.substring(30,accesstoken.length);
        localStorage.setItem('token', this.token);
        console.log(this.token);
      });
  }

  logoutUser(token2: string): void {
    localStorage.removeItem('token');
    console.log(token2[0]);
    this.userService.logoutUser(token2[0])
      .then(str => {        
        console.log(str);
        

      });
  }

}
