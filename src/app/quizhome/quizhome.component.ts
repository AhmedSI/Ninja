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
  minutsleft: number;
  secondeleft: number = 60;
  intervalseconde;
  intervalminuts;
  constructor(
  	private userService: UserServiceService,
    private router: ActivatedRoute,
     private router1: Router,
  	) { 

  }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
  	this.id = this.router.snapshot.paramMap.get("id");
    this.getQuiz();
  }
  startTimer() {
    this.intervalseconde = setInterval(() => {
      if (this.secondeleft > 0) {
        this.secondeleft--;
      }
    }, 1000);

    this.intervalminuts = setInterval(() => {
      if (this.minutsleft > 0) {
        this.minutsleft--;
        this.secondeleft = 60;
      } else{
        this.evaluate();
      }
    }, 59000);
    
  }

  // getLecture(){
  // 	this.userService.getLecture(this.token,this.id).then(lecture=>{
  // 	this.lecture=lecture;
  //   this.getQuiz();

  // 	})
  // }

  getQuiz(){
    this.userService.startQuiz(this.token,+this.id).then(quiz=>{
      this.quiz=quiz;
      this.questionsNum = this.quiz.questions.length;
      for(var i=0;i < this.questionsNum;i++){
        this.answersList[i] = 0;
      }
      this.minutsleft = this.quiz.time.valueOf()-1;
      this.startTimer();
    })
    //this.startQuiz(this.lecture.lectureContentId);
  }

  startQuiz(id:Number){
    //this.userService.startQuiz(this.token,id).then(response=>{})
  }

  evaluate(){
    clearInterval(this.intervalseconde);
    clearInterval(this.intervalminuts);
    let questions = [];
    for(var i = 0;i < this.questionsNum;i++){
      let question = new StudentAnswers();
      let choices = [];
      if (this.quiz.questions[i].multipleChoice){
        for(var j=0;j<this.quiz.questions[i].answers.length;j++){
          var element = <HTMLInputElement>document.getElementById("defaultCheck"+i+j);
          var isChecked = element.checked;
          if(isChecked){
            choices.push(this.quiz.questions[i].answers[j].answerId);
          }
        }
        question.question_id = this.quiz.questions[i].questionId;
        question.answers_ids = choices;
        questions[i] = question;
      }
      else{
        choices[0] = this.answersList[i];
        question.question_id = this.quiz.questions[i].questionId;
        question.answers_ids = choices;
        questions[i] = question;
      }
    }
    console.log(this.submission);
    this.submission.questions = questions;
    this.userService.evaluate(this.token,this.quiz.quizId,this.submission).then(res=>{});
    this.router1.navigate(['/quizResult/'+this.id]);
  }


}
