import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { Course } from '../Course';
declare let $: any;

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit{
  token:string = "initial";
  topCourses:Course[];
  newCourses:Course[];
  suggestedCourses:Course[];
  enrolledCourses:Course;
  course:Course=new Course();


  constructor(
  private userService:UserServiceService,
  private router: ActivatedRoute
  ) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
    this.getTopCourses();
    this.getNewCourses();
    this.getSuggestedCourses();
  }
  getTopCourses(){
    this.userService.topCourses()
    .then(courses =>{this.topCourses=courses;});
  }

  getNewCourses(){
    this.userService.newCourses()
    .then(courses =>{this.newCourses=courses;});
  }

  getSuggestedCourses(){
    this.userService.suggestedCourses()
    .then(courses =>{this.suggestedCourses=courses;});
  }

  enroll(course:Course){
    // console.log(course);
    this.userService.enrollIntoCourse(this.token,course)
    .then(course =>{this.enrolledCourses=course;})
  }


}
