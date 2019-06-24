import { Component, OnInit } from '@angular/core';
import { Course } from '../Course';
import { User } from '.././User';
import { Section } from '../Section';
import { UserServiceService } from '../user-service.service';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-coursehome-component',
  templateUrl: './coursehome-component.component.html',
  styleUrls: ['./coursehome-component.component.css']
})
export class CoursehomeComponentComponent implements OnInit {

  token: string = "initial";
  courseID:string=this.router.snapshot.paramMap.get("id");
  course : Course = new Course();
  sections:Section[];
  constructor(
    private userService: UserServiceService,
    private router: ActivatedRoute,
  private rout: Router

  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.getCourseById();
    console.log("creator name:"+this.course.title);
  }

  getCourseById(){
  	this.userService.getCourseById(this.token,this.courseID)
      .then(course => {this.course = course; this.sections =course.sections;});
  }
  enroll(course:Course){
    // console.log(course);
    this.userService.enrollIntoCourse(this.token,course)
    .then(course =>{});
    this.rout.navigate(['/myCourses']);
  }
  saveCourse(course:Course){
    // console.log(course);
    this.userService.saveCourse(this.token,course)
    .then(course =>{});
    this.rout.navigate(['/savedCourses']);
  }

}  
