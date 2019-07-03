import { Component, OnInit,Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { NgModule } from '@angular/core';
import { User } from '.././User';
import { Course } from '.././Course';
import { UserServiceService } from '.././user-service.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-parentdashboard-component',
  templateUrl: './parentdashboard-component.component.html',
  styleUrls: ['./parentdashboard-component.component.css']
})
export class ParentdashboardComponentComponent implements OnInit {
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
	token: string = "initial";
	children : User[];
	courses: Course[];
	newChild: User = new User();
  courseName :string ="";
  courseId : Number;
  chosenChild: User = new User();
  addChildForm:FormGroup;
  submitted = false;


  constructor(
    private userService: UserServiceService,
    private formBuilder: FormBuilder
    ) { }

    get f() { return this.addChildForm.controls; }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
  	this.getChildren();
    this.getCourses();
    
    this.addChildForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      grade: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
  });
  }

  getChildren(){
  	this.userService.getChildren(this.token)
      .then(children => {this.children = children;});

  }

  getCourses(){
  	this.userService.newCourses()
      .then(children => {this.courses = children;});
  }

  addChild(){
    this.newChild.dateOfBirth=this.addChildForm.value.dateOfBirth;
    this.newChild.email=this.addChildForm.value.email;
    this.newChild.firstName=this.addChildForm.value.firstName;
    this.newChild.gender=this.addChildForm.value.gender;
    this.newChild.grade=this.addChildForm.value.grade;
    this.newChild.lastName=this.addChildForm.value.lastName;
    this.newChild.password=this.addChildForm.value.password;
    this.newChild.username=this.addChildForm.value.username;



    if (this.addChildForm.invalid){
      this.submitted=true;
     return;
    }

  	this.userService.addChild(this.token,this.newChild).then(createChild => { 
  		// childForm.reset();
        this.newChild = new User();
        this.getChildren();
        this.closeBtn1.nativeElement.click();
      });
  }

  detectCourse(id:Number){
    this.courseId = id[0];
    console.log(this.courseId);

  }

  enrollChildInCourse(enrollForm:NgForm){
     this.userService.enrollChildInCourse(this.chosenChild,this.courseId,this.token).then(enrollment => { 
      enrollForm.reset();
        this.chosenChild = new User();
      }); 
  }
}
