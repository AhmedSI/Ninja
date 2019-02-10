import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Course } from '.././Course';
import { Classroom } from '.././Classroom';
import { UserServiceService } from '.././user-service.service';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-classroomdashboard-component',
  templateUrl: './classroomdashboard-component.component.html',
  styleUrls: ['./classroomdashboard-component.component.css']
})
export class ClassroomdashboardComponentComponent implements OnInit {

  classroom : Classroom = new Classroom;
  newCourse : Course = new Course();
  token: string = "initial";
  constructor(
  	private userService: UserServiceService,
    private router: ActivatedRoute
    ) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
  	this.getClassroom();
  }

  getClassroom(){
    //console.log(this.router.snapshot.routeConfig.path);
    this.userService.getClassrooms(this.token)
    .then(classrooms => {
        for(var i = 0;i<classrooms.length;i++) { 
          if(classrooms[i].classroomId == this.router.snapshot.paramMap.get("id")){
          this.classroom = classrooms[i];
          console.log(classrooms[i]);
          break;
      }
    }
    });
  }

  addCourse(courseForm: NgForm){
      //this.courses.unshift(this.newCourse);
  	this.userService.addCourse(this.token,this.newCourse).then(createCourse => { 

        courseForm.reset();
        this.newCourse = new Course();
      });
  }

}
