import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '.././user-service.service';
import { Router,ActivatedRoute} from '@angular/router';
import { Course } from '../Course';
import { Section } from '../Section';
import { Lecture } from '../lecture';
import { Quiz } from '../Quiz';


@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {

  token: string = "initial";
  id : string ;
  course:Course;
  sections:Section[];
  lectures:Lecture[][];
  quiz:Quiz=new Quiz();
  // section:Section;


  constructor(
    private userService: UserServiceService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.course= new Course();

    this.token = localStorage.getItem('token');
    this.id = this.router.snapshot.paramMap.get("id");
    // this.sections=new Section[];
    this.getCourseById();
    
  }

  getCourseById(){

      this.userService.getCourseById(this.token,this.id)
      .then(coursef => {
        this.course = JSON.parse(JSON.stringify(coursef))
        console.log(this.course);
      });
      // this.sections=this.course.sections;
    }

    quizModal(lecture:Lecture){
      this.quiz.title=lecture.name;
    }

    


}
