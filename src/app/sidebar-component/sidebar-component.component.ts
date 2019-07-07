import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { User } from '../User';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar-component.component.html',
  styleUrls: ['./sidebar-component.component.css']
})
export class SidebarComponentComponent implements OnInit {

  user:User;
  token: string = "initial";


  constructor(
    private router: Router,
    private userService: UserServiceService

  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.user=new User();
    this.getUserData();
  }

  getUserData(){
  	this.userService.getUserData(this.token)
      .then(user=> {this.user = user;
      console.log(user)});
  }  

  

}