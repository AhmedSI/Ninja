import { Component, OnInit,Input } from '@angular/core';
import {NgForm, FormGroup} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Course } from '.././Course';
import { Classroom } from '.././Classroom';
import { UserServiceService } from '.././user-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from '.././Category';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-techerdashboard-component',
  templateUrl: './techerdashboard-component.component.html',
  styleUrls: ['./techerdashboard-component.component.css']
})
export class TecherdashboardComponentComponent implements OnInit {
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;

	token: string = "initial";
	newCourse : Course = new Course();
  newClassroom : Classroom = new Classroom();
	courses: Course[];
  classrooms: Classroom[];
  createClassroomForm:FormGroup;
  submitted = false;
  isTeacher : boolean = false;
  categories : Category[];
  request:String = new String();
  requestnum: Number;
  showOverlay:boolean=false;
  courseForm:FormGroup;
  buttonTeacher:string="Be a teacher";
  disable:boolean=false;


  constructor(
    private userService: UserServiceService,
    private formBuilder: FormBuilder
    ) { }
  
    get f() { return this.createClassroomForm.controls; }
    get g() { return this.courseForm.controls; }



  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.requestOfTeaching();

    this.checkTeacher();
  	this.getCourses();
    this.getClassrooms();
    this.getCategoris();

    this.showOverlay=false;

    this.createClassroomForm = this.formBuilder.group({
      classroomName: ['', Validators.required]
  });

    
  this.courseForm =this.formBuilder.group({
    courseName:['',Validators.required],
    detaitedTitle:['',Validators.required],
    category:['',Validators.required],
    level:['',Validators.required],
    courseDescription:['',Validators.required]
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

  // addCourse(courseForm: NgForm){
  //     this.courses.unshift(this.newCourse);
  // 	this.userService.addCourse(this.token,this.newCourse).then(createCourse => { 

  //       courseForm.reset();
  //       this.newCourse = new Course();
  //       console.log(this.courses);
  //       this.getCourses();
  //     });
  // }
  
  addCourse(){
    if (this.courseForm.invalid){
      this.submitted=true;
     return;
    }
    this.newCourse.title=this.courseForm.value.courseName;
    this.newCourse.detailedTitle=this.courseForm.value.detaitedTitle;
    this.newCourse.category=this.courseForm.value.category;
    this.newCourse.level=this.courseForm.value.level;
    this.newCourse.description=this.courseForm.value.courseDescription;

    this.courseForm.reset();

    this.courses.unshift(this.newCourse);
  	this.userService.addCourse(this.token,this.newCourse).then(createCourse => { 

        this.newCourse = new Course();
        this.getCourses();
        console.log(this.courses);
      });
    this.closeBtn1.nativeElement.click();
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
      this.closeBtn2.nativeElement.click();
  }

  checkTeacher(){
    this.userService.getUserData(this.token).then(user=>{
      if(user.teacher) {
        this.isTeacher = true;
        this.showOverlay=false;
      }
      else{
        this.showOverlay=true;
      }
    });
  }

  beTeacher(){
    this.userService.beTeacher(this.token).then(response => {        
        console.log(response);
      }); 
      this.requestOfTeaching();
      this.buttonTeacher="Request Sent";
      this.disable=true;
  }

  getCategoris(){
    this.userService.getCategories().then(categories => {
      this.categories = categories;
    });
  }

  requestOfTeaching(){
    this.userService.getrequestOfTeaching(this.token).then(request => {
      this.request = request;
      console.log(this.request);

      if(this.request=="request approved") this.requestnum=3;
      else if(this.request=="request already sent and not approved yet") this.requestnum=2;
      else this.requestnum=1;
    });



  }

}
