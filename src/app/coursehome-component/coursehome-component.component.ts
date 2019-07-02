import { Component, OnInit } from '@angular/core';
import { Course } from '../Course';
import { User } from '.././User';
import { Section } from '../Section';
import { UserServiceService } from '../user-service.service';
import { Router,ActivatedRoute} from '@angular/router';
import {NgForm, FormGroup} from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Classroom } from '../Classroom';



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
  toggeled: number[] = [];
  children:User[];
  child:User;
  childEnrollment:FormGroup;
  submitted = false;
  childArr:User[]=[];
  chosenID:string= "";
  classrooms:Classroom[];
  addCourse:FormGroup;



  constructor(
    private userService: UserServiceService,
    private router: ActivatedRoute,
  private rout: Router,
  private formBuilder: FormBuilder

  ) { }

  get g() { return this.childEnrollment.controls; }
  get f() { return this.addCourse.controls; }



  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.getCourseById();
    this.getChildren();
    this.getClassrooms();

    console.log("creator name:"+this.course.title);
    this.child=new User();


    this.childEnrollment =this.formBuilder.group({
      childName:['',Validators.required]
    });

    this.addCourse =this.formBuilder.group({
      classroomName:['',Validators.required]
    });
    
    }
  
    getClassrooms(){
      this.userService.getClassrooms(this.token)
        .then(classrooms => {this.classrooms = classrooms;});
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
  togglearrow(index: number) {
    var flag = true;
    for (var i = 0; i < this.toggeled.length; i++) {
      if (this.toggeled[i] === index) {
        this.toggeled.splice(i, 1);
        flag = false;
        break;
      }
    }
    if (flag) {
      this.toggeled.push(index);
    }

  }

  getChildren(){
  	this.userService.getChildren(this.token)
      .then(children => {this.children = children;});
  }

  enrollChild(){

    if (this.childEnrollment.invalid){
      this.submitted=true;
     return;
    }
    
    // console.log(this.child);
    this.chosenID=this.childEnrollment.value.childName;
    console.log(this.chosenID);

    this.childArr = this.children.filter(chosen => chosen.firstName == this.childEnrollment.value.childName);
    this.child=this.childArr[0];

    console.log(this.childArr)
    // this.childEnrollment.reset();

    // this.child=Object.keys(this.children).some(key => this.children[key].id === this.childEnrollment.value.childName);
    this.userService.enrollChildInCourse(this.child,Number(this.courseID),this.token)
    .then(enrollment => { 
      // this.childEnrollment.reset();
      // this.childEnrollment.removeControl;

       this.child = new User();
       this.getChildren();
       console.log(this.child);
     }); 

    //  this.childEnrollment.reset();
     this.childEnrollment.removeControl;

      this.child = new User();
      this.getChildren();
      console.log(this.child);
 }
  
 addCourseToClassroom(){

  if (this.addCourse.invalid){
    this.submitted=true;
   return;
  }
  
  // this.courseID=this.addCourse.value.classroomName;
  // console.log(this.courseID);

  // this.courseArr = this.courses.filter(chosen => chosen.courseId == this.teacherCourse.value.courseName);
  // this.chosenCourse=this.courseArr[0];

  // console.log(this.chosenCourse)
  this.userService.AddCourseIntoClassroom(this.token,this.addCourse.value.classroomName,this.course)
  .then(enrollment => { 
   }); 

}

}  
