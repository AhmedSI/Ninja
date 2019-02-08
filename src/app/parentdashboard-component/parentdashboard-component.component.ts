import { Component, OnInit,Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { NgModule } from '@angular/core';
import { User } from '.././User';
import { Course } from '.././Course';
import { UserServiceService } from '.././user-service.service';

@Component({
  selector: 'app-parentdashboard-component',
  templateUrl: './parentdashboard-component.component.html',
  styleUrls: ['./parentdashboard-component.component.css']
})
export class ParentdashboardComponentComponent implements OnInit {
	token: string = "initial";
	children : User[];
	courses: Course[];
	newChild: User = new User();;
  constructor(private userService: UserServiceService) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
  	this.getChildren();
  	this.getCourses();
  }

  getChildren(){
  	this.userService.getChildren(this.token)
      .then(children => {this.children = children;});
  }

  getCourses(){
  	this.userService.getCourses(this.token)
      .then(children => {this.courses = children;});
  }

  addChild(childForm:NgForm){
  	this.userService.addChild(this.token,this.newChild).then(createChild => { 
  		childForm.reset();
        this.newChild = new User();
      });
  }
}
