import { Component, OnInit } from '@angular/core';
import { Course } from '.././Course';
import { Classroom } from '.././Classroom';
import { UserServiceService } from '.././user-service.service';
import { Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-coursedashboard-component',
  templateUrl: './coursedashboard-component.component.html',
  styleUrls: ['./coursedashboard-component.component.css']
})
export class CoursedashboardComponentComponent implements OnInit {
  course : Course = new Course;
  token: string = "initial";
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
   				console.log(courses[i]);
   				break;
			}
		}
    });
  }

  

}
