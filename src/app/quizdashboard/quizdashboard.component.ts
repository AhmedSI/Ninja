import { Component, OnInit } from '@angular/core';
import { Quiz } from '.././Quiz';
import { Question } from '.././Question';
import { Answer } from '.././Answer';
import { User } from '.././User';
import { Lecture } from '.././Lecture';
import { UserServiceService } from '.././user-service.service';
import { Router,ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-quizdashboard',
  templateUrl: './quizdashboard.component.html',
  styleUrls: ['./quizdashboard.component.css']
})
export class QuizdashboardComponent implements OnInit {
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;
  @ViewChild('closeBtn4') closeBtn4: ElementRef;
  token: string = "initial";
  quiz: Quiz = new Quiz();
  lecture: Lecture = new Lecture();
  id : string ;
  selectedQuestionId:string;
  selectedAnswerId:string;
  newQuestion:Question = new Question();
  newAnswer:Answer = new Answer();
  qNumber:Number = 0;
  newQuiz:Quiz = new Quiz();

  constructor(
    private userService: UserServiceService,
    private router: ActivatedRoute, private route: Router
    ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.id = this.router.snapshot.paramMap.get("id");

    this.getQuiz(parseInt(this.id, 10));
    //this.getLecture();
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

  setSelectedSolution(id:string){
    this.selectedAnswerId = id;
  }

  addQuestion(questionForm:NgForm){
    //this.newQuestion.is_multiple_choice = false;
    console.log(this.newQuestion.is_multiple_choice);
    this.userService.addQuestion(this.token,this.newQuestion,this.quiz.quizId).then(response =>{
      this.getQuiz(+this.id);
      this.closeBtn1.nativeElement.click();
    })
  }

  updateQuestion(updateQuestionForm:NgForm){
    this.newQuestion.is_multiple_choice = false;
    this.newQuestion.questionId = parseInt(this.selectedQuestionId, 10);
    this.userService.updateQuestionById(this.token,this.newQuestion).then(response =>{
      this.getQuiz(+this.id);
      this.closeBtn2.nativeElement.click();
    })
  }

  deleteQuestion(questionId:string){
    this.userService.deleteQuestion(this.token,questionId).then(response =>{
      this.getQuiz(+this.id);
    })
  }

  addAnswer(AnswerForm:NgForm){
    this.userService.addAnswer(this.token,this.newAnswer,this.selectedQuestionId).then(response =>{
      this.getQuiz(+this.id);
      this.closeBtn3.nativeElement.click();
    })
  }

  updateAnswer(updateAnswerForm:NgForm){
    this.newAnswer.answerId = parseInt(this.selectedAnswerId, 10);
    console.log(this.newAnswer.answerId);
    this.userService.updateAnswerById(this.token,this.newAnswer).then(response =>{
      this.getQuiz(+this.id);
      this.closeBtn4.nativeElement.click();
    })
  }

  deleteAnswer(answerId:string){
  console.log(answerId);
    this.userService.deleteAnswer(this.token,answerId).then(response =>{
      this.getQuiz(+this.id);
    })
  }

  setNumber(questionNoForm:NgForm){
    this.userService.setQuestionsNumber(this.token,this.quiz.quizId,this.qNumber).then(response =>{
      this.getQuiz(+this.id);
    });
    this.route.navigate(['/home']);
  }

  updateQuiz(quizForm:NgForm){
    
    this.userService.updateQuiz(this.token,this.quiz.quizId,this.newQuiz).then(response =>{
      this.getQuiz(+this.id);console.log(this.newQuiz);
    })
  }

}
