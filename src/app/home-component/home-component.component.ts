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
  topCoursesSlide :number[];
  newCoursesSlide:number[];
  suggestedCoursesSlide:number[];
  topcoursespinner:boolean=true;
  newcoursespinner: boolean = true;
  suggestcoursespinner: boolean = true;
  
  constructor(
  private userService:UserServiceService,
  private router: Router
  ) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
    this.getTopCourses();
    this.getNewCourses();
    this.getSuggestedCourses();
    $('.carousel').carousel({
      interval: 2000
    })
  }
  getTopCourses(){
    this.userService.topCourses()
    .then(courses =>{
      this.topCourses=courses;
      this.topCoursesSlide= Array(Math.ceil(this.topCourses.length/3)).fill(1);
      this.topcoursespinner=false;
    });
  }

  getNewCourses(){
    this.userService.newCourses()
    .then(courses =>{this.newCourses=courses;this.newCoursesSlide= Array(Math.ceil(this.newCourses.length/3)).fill(1);this.newcoursespinner=false;});
  }

  getSuggestedCourses(){
    this.userService.suggestedCourses()
    .then(courses =>{this.suggestedCourses=courses;this.suggestedCoursesSlide= Array(Math.ceil(this.suggestedCourses.length/3)).fill(1);this.suggestcoursespinner=false;});
  }

  enroll(course:Course){
    // console.log(course);
    this.userService.enrollIntoCourse(this.token,course)
    .then(course =>{});
    this.router.navigate(['/myCourses']);
  }

}
