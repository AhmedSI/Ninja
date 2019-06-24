import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { Course } from '../Course';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  token:string = "initial";
  enrolledCourses:Course;
  course:Course=new Course();

  constructor(
    private userService:UserServiceService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.getEnrolledCourses();
  }
  getEnrolledCourses(){
    this.userService.getEnrolledCourses(this.token)
    .then(courses =>{this.enrolledCourses=courses;});

  }

}
