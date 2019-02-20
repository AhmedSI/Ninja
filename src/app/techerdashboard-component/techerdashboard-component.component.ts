import { Component, OnInit,Input } from '@angular/core';
import {NgForm, FormGroup} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Course } from '.././Course';
import { Classroom } from '.././Classroom';
import { UserServiceService } from '.././user-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from '.././Category';

@Component({
  selector: 'app-techerdashboard-component',
  templateUrl: './techerdashboard-component.component.html',
  styleUrls: ['./techerdashboard-component.component.css']
})
export class TecherdashboardComponentComponent implements OnInit {
	token: string = "initial";
	newCourse : Course = new Course();
  newClassroom : Classroom = new Classroom();
	courses: Course[];
  classrooms: Classroom[];
  createClassroomForm:FormGroup;
  submitted = false;
  isTeacher : boolean = false;
  categories : Category[];

  constructor(
    private userService: UserServiceService,
    private formBuilder: FormBuilder
    ) { }
  
    get f() { return this.createClassroomForm.controls; }


  ngOnInit() {
  	this.token = localStorage.getItem('token');
    this.checkTeacher();
  	this.getCourses();
    this.getClassrooms();
    this.getCategoris()

    this.createClassroomForm = this.formBuilder.group({
      classroomName: ['', Validators.required]
  });
  }
  getCourses(){
  	this.userService.getCourses(this.token)
      .then(courses => {this.courses = courses;});
  }
  getClassrooms(){
    this.userService.getClassrooms(this.token)
      .then(classrooms => {this.classrooms = classrooms;});
  }

  addCourse(courseForm: NgForm){
      this.courses.unshift(this.newCourse);
  	this.userService.addCourse(this.token,this.newCourse).then(createCourse => { 

        courseForm.reset();
        this.newCourse = new Course();
        console.log(this.courses);
      });
  }

  addClassroom(){
    if (this.createClassroomForm.invalid){
      this.submitted=true;
     return;
    }
    this.newClassroom.classroomName=this.createClassroomForm.value.classroomName;
    console.log(this.newClassroom);

    this.createClassroomForm.reset();

    this.classrooms.unshift(this.newClassroom);
    this.userService.addClassroom(this.token,this.newClassroom).then(createClassroom => {        
        // this.createClassroomForm.reset();
        this.newClassroom = new Classroom();
      });	
      
  }

  checkTeacher(){
    this.userService.getUserData(this.token).then(user=>{
      if(user.teacher) this.isTeacher = true;
    });
  }

  beTeacher(){
    this.userService.beTeacher(this.token).then(response => {        
        console.log(response);
      }); 
  }

  getCategoris(){
    this.userService.getCategories().then(categories => {
      this.categories = categories;
    });
  }

}
