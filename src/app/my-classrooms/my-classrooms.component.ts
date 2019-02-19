import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Course } from '.././Course';
import { Classroom } from '.././Classroom';
import { UserServiceService } from '.././user-service.service';


@Component({
  selector: 'app-my-classrooms',
  templateUrl: './my-classrooms.component.html',
  styleUrls: ['./my-classrooms.component.css']
})
export class MyClassroomsComponent implements OnInit {
  token: string = "initial";
  toBeJoinedClassroom:Classroom= new Classroom();
  enrolledClassroom:Classroom;
  classroom:Classroom=new Classroom();
  model: any = {};



  // classrooms: Classroom[];
  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.getEnrolledClassroom();
  }

  getEnrolledClassroom(){
    this.userService.getEnrolledClassroom(this.token)
    .then(classroom =>{this.enrolledClassroom=classroom;});
  }

  onSubmit(){
    console.log(this.toBeJoinedClassroom.passCode);
    // this.classrooms.unshift(this.newClassroom);
    this.userService.enrollClassroom(this.token,this.toBeJoinedClassroom).then(createClassroom => {        
        this.toBeJoinedClassroom = new Classroom();
      });	  
      this.toBeJoinedClassroom.passCode='';
  }
}
