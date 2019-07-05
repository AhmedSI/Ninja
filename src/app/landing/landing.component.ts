import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserServiceService } from '../user-service.service';
import { Course } from '../Course';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  token: string = "initial";
  topCoursesRaw:Course[];
  topCourses:Course[];

  constructor(
    private router: Router,
    private activeRoute : ActivatedRoute,
    private location: Location,
    private userService:UserServiceService
      )
  { }

  ngOnInit() {
    let topCourses:Course[]=[];
    if(localStorage.getItem('token')) {
      console.log(window.location.pathname);

      if( window.location.pathname ==='/**' ){
        this.router.navigateByUrl('/error', {skipLocationChange: true});
        this.location.replaceState('');
      }
      else if( window.location.pathname ==='/'){
        this.router.navigateByUrl('/home', {skipLocationChange: true});
        this.location.replaceState('');
      }

    }
    else{
      this.router.navigateByUrl('/landing', {skipLocationChange: true});
      this.location.replaceState('');
    }
    
    this.getTopCourses();
  }

  getTopCourses(){
      this.userService.topCourses()
      .then(courses =>{this.topCoursesRaw=courses;
        this.topCourses=this.topCoursesRaw;
      });
  }

}
