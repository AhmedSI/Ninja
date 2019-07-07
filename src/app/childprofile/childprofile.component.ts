import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { User } from '../User';
import { Classroom } from '.././Classroom';
import { UserServiceService } from '../user-service.service';
import { Course } from '../Course';

@Component({
  selector: 'app-childprofile',
  templateUrl: './childprofile.component.html',
  styleUrls: ['./childprofile.component.css']
})
export class ChildprofileComponent implements OnInit {
	token: string = "initial";
  child:User=  new User();;
  childID:string=this.router.snapshot.paramMap.get("id");
  toBeJoinedClassroom:Classroom= new Classroom();
  courses:Course[];
  course:Course;


  constructor(
	  private userService: UserServiceService,
	  private router: ActivatedRoute
  ) {

   }

  ngOnInit() {
    // let child =  new User();
  	this.token = localStorage.getItem('token');
    this.getChildData();
    this.getChildCourses();
    this.getCourseById();
  }

  getChildData(){
  	this.userService.getChild(this.token,this.childID)
      .then(child => {
        this.child = child;
        // console.log(this.child);
      });

  }

  enrollChildinClassRoom(){
  	this.userService.enrollChildInClassroom(this.token,this.toBeJoinedClassroom.passCode,this.child.firstName).then(response => {
      this.toBeJoinedClassroom = new Classroom();
  	});
    this.toBeJoinedClassroom.passCode='';
  }

  getChildCourses(){
    console.log(this.childID);
    this.userService.getChildCourses(this.token,this.childID)
    .then(courses => {
      this.courses = courses;
      console.log(courses);
  	});
  }

  // getCourseById(){

  // }
}
