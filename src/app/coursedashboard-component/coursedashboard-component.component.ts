import { Component, OnInit } from '@angular/core';
import { Course } from '.././Course';
import { Section } from '.././Section';
import { Classroom } from '.././Classroom';
import { UserServiceService } from '.././user-service.service';
import { Router,ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-coursedashboard-component',
  templateUrl: './coursedashboard-component.component.html',
  styleUrls: ['./coursedashboard-component.component.css']
})
export class CoursedashboardComponentComponent implements OnInit {
  course : Course = new Course;
  token: string = "initial";
  newSection : Section = new Section();
  sections : Section[];
  constructor(
  	private userService: UserServiceService,
    private router: ActivatedRoute
    ) { }

  ngOnInit(
  ) {
  	this.token = localStorage.getItem('token');
  	this.getCourse();

  }

  getCourse(){
  	//console.log(this.router.snapshot.routeConfig.path);
  	this.userService.getCourses(this.token)
  	.then(courses => {
      	for(var i = 0;i<courses.length;i++) { 
      		if(courses[i].courseId == this.router.snapshot.paramMap.get("id")){
   				this.course = courses[i];
          this.sections = courses[i].sections;
   				console.log(courses[i]);
   				break;
			}
		}
    });
  }


  addSection(sectionForm:NgForm){
    this.userService.addSectionForCourse(this.token,this.course.courseId,this.newSection)
    .then(section => {
        this.sections.unshift(this.newSection);
        console.log(section);
    });

  }

  deleteSection(id:Number){
        
    this.userService.deleteSection(id,this.token).then(section => {
        
    });

  }

}
