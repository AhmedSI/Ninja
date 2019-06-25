import { Component, OnInit } from '@angular/core';
import {NgForm,FormGroup} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Course } from '.././Course';
import { Classroom } from '.././Classroom';
import { UserServiceService } from '.././user-service.service';
import { Router,ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from '.././Category';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-classroomdashboard-component',
  templateUrl: './classroomdashboard-component.component.html',
  styleUrls: ['./classroomdashboard-component.component.css']
})
export class ClassroomdashboardComponentComponent implements OnInit {

  classroom : Classroom = new Classroom;
  newCourse : Course = new Course();
  token: string = "initial";
  show:boolean = false;
  courseForm:FormGroup;
  submitted = false;
  categories : Category[];


  constructor(
  	private userService: UserServiceService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,private _snackBar2: MatSnackBar
    ) { }
    get g() { return this.courseForm.controls; }


  ngOnInit() {
  	this.token = localStorage.getItem('token');
    this.getClassroom();
    this.getCategoris();

    this.show=false ;

    this.courseForm =this.formBuilder.group({
      courseName:['',Validators.required],
      detaitedTitle:['',Validators.required],
      category:['',Validators.required],
      level:['',Validators.required],
      courseDescription:['',Validators.required]
    });
  }

  getClassroom(){
    //console.log(this.router.snapshot.routeConfig.path);
    this.userService.getClassrooms(this.token)
    .then(classrooms => {
        for(var i = 0;i<classrooms.length;i++) { 
          if(classrooms[i].classroomId == this.router.snapshot.paramMap.get("id")){
          this.classroom = classrooms[i];
          console.log(classrooms[i]);
          break;
      }
    }
    });
  }

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
    
      //this.courses.unshift(this.newCourse);
  	this.userService.NewCourseInClassroom(this.token,this.classroom.classroomId,this.newCourse).then(createCourse => { 

        this.courseForm.reset();
        this.newCourse = new Course();
      });
  }

  showForm(){this.show=true;}
  dontShow(){this.show=false;}
  getCategoris(){
    this.userService.getCategories().then(categories => {
      this.categories = categories;
    });
  }
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this._snackBar2.open('Sucssefully Copied to clipboard', '', {
      duration: 2000, panelClass: ['custom-snackbar-one']
    });
  }
}
