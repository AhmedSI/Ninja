import { Component, OnInit } from '@angular/core';
import { Quiz } from '.././Quiz';
import { StudentSubmission} from '.././StudentSubmission';
import {StudentAnswers} from '.././StudentAnswers';
import { Question } from '.././Question';
import { Answer } from '.././Answer';
import { Lecture } from '.././Lecture';
import { UserServiceService } from '.././user-service.service';
import { Router,ActivatedRoute} from '@angular/router';
import {NgForm,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-quizhome',
  templateUrl: './quizhome.component.html',
  styleUrls: ['./quizhome.component.css']
})
export class QuizhomeComponent implements OnInit {
	token: string = "initial";
 	quiz: Quiz = new Quiz();
  answersForm: FormGroup;
 	lecture: Lecture = new Lecture();
	id : string ;
  questionsNum:Number;
  answersList:Number[] = [];
  submission:StudentSubmission = new StudentSubmission();
  grade:Number = 0;

  constructor(
  	private userService: UserServiceService,
    private router: ActivatedRoute,
     private router1: Router,
  	) { 

  }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
  	this.id = this.router.snapshot.paramMap.get("id");
    this.getLecture();
  }

  getLecture(){
  	this.userService.getLecture(this.token,this.id).then(lecture=>{
  	this.lecture=lecture;
    this.getQuiz();

  	})
  }

  getQuiz(){
    this.userService.startQuiz(this.token,this.lecture.lectureContentId).then(quiz=>{
      this.quiz=quiz;
      this.questionsNum = this.quiz.questions.length;
      for(var i=0;i < this.questionsNum;i++){
        this.answersList[i] = 0;
      }
      console.log(this.quiz.questions);
    })
    //this.startQuiz(this.lecture.lectureContentId);
  }

  startQuiz(id:Number){
    //this.userService.startQuiz(this.token,id).then(response=>{})
  }

  evaluate(){
    let questions = [];
    for(var i = 0;i < this.questionsNum;i++){
      let question = new StudentAnswers();
      let choices = [];
      choices[0] = this.answersList[i];
      question.question_id = this.quiz.questions[i].questionId;
      question.answers_ids = choices;
      questions[i] = question;
    }
    this.submission.questions = questions;
    console.log(this.submission);
    this.userService.evaluate(this.token,this.quiz.quizId,this.submission).then(res=>{console.log(res)});
    this.router1.navigate(['/quizResult/'+this.id]);
  }


}
