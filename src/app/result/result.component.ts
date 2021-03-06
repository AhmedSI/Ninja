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
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
	token: string = "initial";
	quiz: Quiz = new Quiz();
	answersForm: FormGroup;
	lecture: Lecture = new Lecture();
	id : string ;
	questionsNum:Number;
	answersList:Number[] = [];
	submission:StudentSubmission = new StudentSubmission();
	grade:Number = 0;
	result :string="";
	wrongQuestion:string[];
	wrongQuestions:Question[]=[];
  constructor(

    
    private router: ActivatedRoute,
  	private userService: UserServiceService
  	) { 

  }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
  	this.id = this.router.snapshot.paramMap.get("id");
	  this.getQuizInfoForStudent();
  }


	getQuizInfoForStudent(){
		this.userService.getQuizscore(this.token, +this.router.snapshot.paramMap.get("id")).then(quiz => {
			this.quiz = quiz;
			this.wrongQuestion = this.quiz.notes.split(",");
			console.log(this.quiz);
			this.getWrongQuestion();
		})
	  }
	getWrongQuestion(){
		for(var i=0;i<this.wrongQuestion.length-1;i++){
			
			this.userService.getQuestionById(this.token, +this.wrongQuestion[i]).then(Question =>{
				
				this.wrongQuestions.push(Question);
			})
		}
	}
}
