import { Component, OnInit } from '@angular/core';
import { Course } from '../Course';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {
  token:string = "initial";
  courses: Course[];

  constructor(
    private userService:UserServiceService,
    private router: Router  
  ) { }

  ngOnInit() {
    let courses: Course[] = [];
  this.token = localStorage.getItem('token');
  this.getSavedCourses();
  }

  getSavedCourses(){
    this.userService.getSavedCourses(this.token)
    .then(course =>this.courses=course);
  }
}
