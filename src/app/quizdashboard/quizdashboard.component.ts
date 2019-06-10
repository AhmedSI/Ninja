import { Component, OnInit } from '@angular/core';
import { Quiz } from '.././Quiz';
import { Question } from '.././Question';
import { Answer } from '.././Answer';
import { User } from '.././User';
import { Lecture } from '.././Lecture';
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
	lecture: Lecture = new Lecture();
	id : string ;
	selectedQuestionId:string;
	newQuestion:Question = new Question();
	newAnswer:Answer = new Answer();
  qNumber:Number = 0;
  newQuiz:Quiz = new Quiz();

  constructor(
  	private userService: UserServiceService,
    private router: ActivatedRoute
    ) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
  	this.id = this.router.snapshot.paramMap.get("id");
    this.getLecture();
    console.log(this.id);
  }

  getQuiz(id:Number){
    this.userService.getQuiz(this.token,id).then(quiz=>{
      this.quiz=quiz;
      console.log(this.quiz);
    })
  }

  

  getLecture(){
  	this.userService.getLecture(this.token,this.id).then(lecture=>{
  		this.lecture=lecture;
      this.getQuiz(this.lecture.lectureContentId);
  	})
  }

  setSelectedquestion(id:string){
    this.selectedQuestionId = id;
  }

  addQuestion(questionForm:NgForm){
    //this.newQuestion.is_multiple_choice = false;
    console.log(this.newQuestion.is_multiple_choice);
  	this.userService.addQuestion(this.token,this.newQuestion,this.quiz.quizId).then(response =>{
  		this.getLecture();
  	})
  }

  updateQuestion(updteQuestionForm:NgForm){
    this.newQuestion.is_multiple_choice = false;
    this.newQuestion.questionId = parseInt(this.selectedQuestionId, 10);
    this.userService.updateQuestionById(this.token,this.newQuestion).then(response =>{
      this.getLecture();
    })
  }

  deleteQuestion(questionId:string){
  	this.userService.deleteQuestion(this.token,questionId).then(response =>{
  		this.getLecture();
  	})
  }

  addAnswer(AnswerForm:NgForm){
  	this.userService.addAnswer(this.token,this.newAnswer,this.selectedQuestionId).then(response =>{
  		this.getLecture();
  	})
  }

  updateAnswer(updteAnswerForm:NgForm){
    this.newQuestion.questionId = parseInt(this.selectedQuestionId, 10);
    this.userService.updateAnswerById(this.token,this.newAnswer).then(response =>{
      this.getLecture();console.log("fa")
    })
  }

  deleteAnswer(answerId:string){
  console.log(answerId);
  	this.userService.deleteAnswer(this.token,answerId).then(response =>{
  		this.getLecture();
  	})
  }

  setNumber(questionNoForm:NgForm){
    this.userService.setQuestionsNumber(this.token,this.quiz.quizId,this.qNumber).then(response =>{
      this.getLecture();
    })
  }

  updateQuiz(quizForm:NgForm){
    console.log(this.newQuiz);
    this.userService.updateQuiz(this.token,this.quiz.quizId,this.newQuiz).then(response =>{
      this.getLecture();
    })
  }

}
