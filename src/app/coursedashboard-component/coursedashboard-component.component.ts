import { Component, OnInit } from '@angular/core';
import { Course } from '.././Course';
import { Section } from '.././Section';
import { Classroom } from '.././Classroom';
import { Quiz } from '.././Quiz';
import { UserServiceService } from '.././user-service.service';
import { Router,ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';


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
  selectedSectionId:string;
  newQuiz:Quiz = new Quiz;
  aimForm: FormGroup;
  aims: string [];
  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(
  	private userService: UserServiceService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder

    ) { }

  ngOnInit(
  ) {
  	this.token = localStorage.getItem('token');
    this.getCourse();
    this.aims = [];
    this.aimForm = this.formBuilder.group({
      aim:['']
    });

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

  addAim(){
    this.aims.push(this.aimForm.value.aim);
    this.aimForm.reset();
  }

  onDeleteAim(aim:string){
    this.aims = this.aims.filter(obj => obj !== aim);
    console.log("aim: "+aim);
    console.log("aims: "+this.aims);
  }


  addSection(sectionForm:NgForm){
    this.userService.addSectionForCourse(this.token,this.course.courseId,this.newSection)
    .then(section => {
        this.getCourse();
    });

  }

  addQuiz(quizForm:NgForm){
    this.userService.addQuiz(this.token,this.selectedSectionId,this.newQuiz)
    .then(section => {
        this.getCourse();
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(lectureForm:NgForm){
    this.currentFileUpload = this.selectedFiles.item(0);
    this.userService.pushLectureContent(
      this.currentFileUpload,this.token,this.selectedSectionId)
      .then(event => {
          this.getCourse();
      }
    );
  }

  setSelectedSection(id:string){
    this.selectedSectionId = id;
  }

  deleteSection(id:Number){
        
    this.userService.deleteSection(id,this.token).then(section => {
        this.getCourse();
    });

  }

  deleteQuiz(id:Number){
        
    this.userService.deleteQuiz(id,this.token).then(section => {
        this.getCourse();
    });

  }



}
