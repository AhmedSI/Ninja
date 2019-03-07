import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '.././user-service.service';
import { Router,ActivatedRoute} from '@angular/router';
import { Course } from '../Course';
import { Section } from '../Section';
import { Lecture } from '../Lecture';
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
  selectedLecture:string;
  lecture:Lecture=new Lecture();
  fileSrc:string;
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

  setLecture(id){
    this.selectedLecture = id;
    this.getLecture();
  }

    getLectureContent(id:Number){
      this.userService.getLectureContent(this.token,id).then(response=>{

        let file = new Blob([response.byteArray], { type: 'application/pdf' });            
        var fileURL = URL.createObjectURL(file);
        console.log(fileURL);
        this.fileSrc = fileURL;
        //this.lectureContent = file;
        //console.log(file);
      })
    }

  getLecture(){
    this.userService.getLecture(this.token,this.selectedLecture).then(lecture=>{
      this.lecture = lecture;
      this.getLectureContentTry(lecture.lectureContentId);
    })
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


    getLectureContentTry(id:Number){
      this.userService.downloadPDF(this.token,id).then(
        (res) => {
        var fileURL = URL.createObjectURL(res);
        this.fileSrc = "http://www.africau.edu/images/default/sample.pdf";
        console.log(fileURL);
        }
    );
    }
    


}
