import { Component, OnInit } from '@angular/core';
import { Course } from '../Course';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accomplished-courses',
  templateUrl: './accomplished-courses.component.html',
  styleUrls: ['./accomplished-courses.component.css']
})
export class AccomplishedCoursesComponent implements OnInit {

  token:string = "initial";
  courses: Course[]

  constructor(
    private userService:UserServiceService,
    private router: Router  
  ) { }

  ngOnInit() {
    let courses: Course[] = [];
    this.token = localStorage.getItem('token');
    this.getAccomplishedCourses();
  }

  getAccomplishedCourses(){
    this.userService.getAccomplishedCourses(this.token)
    .then(course =>{this.courses=course
      console.log(this.courses);
    });

  }
}