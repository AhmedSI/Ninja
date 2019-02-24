import { Component, OnInit } from '@angular/core';
import { Quiz } from '.././Quiz';
import { Question } from '.././Question';
import { Answer } from '.././Answer';
import { UserServiceService } from '.././user-service.service';
import { Router,ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-quizdashboard',
  templateUrl: './quizdashboard.component.html',
  styleUrls: ['./quizdashboard.component.css']
})
export class QuizdashboardComponent implements OnInit {
	token: string = "initial";
	quiz: Quiz = new Quiz();
	id : string ;
	selectedQuestionId:string;
	newQuestion:Question = new Question();
	newAnswer:Answer = new Answer();

  constructor(
  	private userService: UserServiceService,
    private router: ActivatedRoute
    ) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
  	this.id = this.router.snapshot.paramMap.get("id");
  	this.getQuiz();
  }

  getQuiz(){
  	this.userService.getQuiz(this.token,this.id).then(quiz=>{
  		this.quiz=quiz;
  	})
  }

  setSelectedquestion(id:string){
    this.selectedQuestionId = id;
  }

  addQuestion(questionForm:NgForm){
  	this.userService.addQuestion(this.token,this.newQuestion,this.id).then(response =>{
  		this.getQuiz();
  	})
  }

  deleteQuestion(questionId:string){
  	this.userService.deleteQuestion(this.token,questionId).then(response =>{
  		this.getQuiz();
  	})
  }

  addAnswer(AnswerForm:NgForm){
  	this.userService.addAnswer(this.token,this.newAnswer,this.selectedQuestionId).then(response =>{
  		this.getQuiz();
  	})
  }

  deleteAnswer(answerId:string){
  	this.userService.deleteAnswer(this.token,answerId).then(response =>{
  		this.getQuiz();
  	})
  }

}
