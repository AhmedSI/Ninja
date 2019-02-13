import { Component, OnInit } from '@angular/core';
import { Course } from '../Course';
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
  course:Course= new Course();

  constructor(
    private userService: UserServiceService,
    private router: ActivatedRoute

  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.getCourseById();
    // this.course.courseId=this.router.snapshot.paramMap.get("id");
  }

  getCourseById(){
  	this.userService.getCourseById(this.token,this.courseID)
      .then(course => {this.course = course;});
      console.log("creator name:"+this.course.publisher);
    }
  }  
