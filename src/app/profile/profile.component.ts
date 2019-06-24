import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { User } from '../User';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  token: string = "initial";
  user:User= new User();

  constructor(
    private userService: UserServiceService,
    private router: Router
    ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
  	this.getUserData();
  }

  getUserData(){
  	this.userService.getUserData(this.token)
      .then(user => {this.user = user;});
  }
}