import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '.././user-service.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
	token: string = "initial";
  requests: Request[];
  disable:boolean=false;
  buttonPlaceholder:string="accept this request";
  constructor(
  	private userService: UserServiceService
  ) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
    this.getRequests();
  }

  getRequests(){
  	this.userService.getTeacherRequests(this.token)
      .then(requests => {this.requests = requests;});
  }

  acceptRequest(id:number){
  	this.userService.acceptTeacher(this.token,id).then(acceptRequest => {   
      this.getRequests();
      });	
    }

}
