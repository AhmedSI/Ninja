import { Component, OnInit,Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Course } from '.././Course';
import { Classroom } from '.././Classroom';
import { UserServiceService } from '.././user-service.service';

@Component({
  selector: 'app-techerdashboard-component',
  templateUrl: './techerdashboard-component.component.html',
  styleUrls: ['./techerdashboard-component.component.css']
})
export class TecherdashboardComponentComponent implements OnInit {
	token: string = "initial";
	newCourse : Course = new Course();
  newClassroom : Classroom = new Classroom();
	courses: Course[];
  classrooms: Classroom[];
  constructor(private userService: UserServiceService) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
  	this.getCourses();
    this.getClassrooms();
  }
  getCourses(){
  	this.userService.getCourses(this.token)
      .then(courses => {this.courses = courses;});
  }
  getClassrooms(){
    this.userService.getClassrooms(this.token)
      .then(classrooms => {this.classrooms = classrooms;});
  }

  addCourse(courseForm: NgForm){
      this.courses.unshift(this.newCourse);
  	this.userService.addCourse(this.token,this.newCourse).then(createCourse => { 

        courseForm.reset();
        this.newCourse = new Course();
        console.log(this.courses);
      });
  }
  addClassroom(classroomForm: NgForm){
    
         this.classrooms.unshift(this.newClassroom);
    this.userService.addClassroom(this.token,this.newClassroom).then(createClassroom => {        
        classroomForm.reset();
        this.newClassroom = new Classroom();
      });	
      
  }

}
