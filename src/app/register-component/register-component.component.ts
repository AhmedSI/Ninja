import { Component, OnInit ,Input} from '@angular/core';
import { User } from '.././User';
import { NgModule } from '@angular/core';
import { UserServiceService } from '.././user-service.service';
import {NgForm} from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

  newUser: User = new User();
  token: string = "initial";
  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  addUser(userForm: NgForm): void {
    this.userService.registerUser(this.newUser)
      .then(createUser => {        
        userForm.reset();
        this.newUser = new User();
        this.router.navigate(['/login']);
      });
  }
}
