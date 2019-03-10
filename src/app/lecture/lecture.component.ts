import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '.././user-service.service';
import { Router,ActivatedRoute} from '@angular/router';
import { Course } from '../Course';
import { Section } from '../Section';
import { Lecture } from '../Lecture';
import { Quiz } from '../Quiz';
import { fileContent } from '../fileContent';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


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
  selectedLecture:Number;
  lecture:Lecture=new Lecture();
  fileSrc:string;
  trustedDashboardUrl : SafeUrl;
  lectureContent:fileContent;
  request:string;

  constructor(
    private userService: UserServiceService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.course= new Course();
    this.lectureContent=new fileContent();
    this.token = localStorage.getItem('token');
    this.id = this.router.snapshot.paramMap.get("id");
    this.getCourseById();
  }

  getCourseById(){
    this.userService.getCourseById(this.token,this.id)
      .then(coursef => {
        this.course = JSON.parse(JSON.stringify(coursef))
        // console.log(this.course);
      });
  }

  setLecture(lecture:Lecture){
    this.lecture = lecture;
    let lectureId =lecture.lectureContentId;
    this.selectedLecture = lectureId;
    this.getLectureContent(lectureId);
  }

  

  quizModal(lecture:Lecture){
    this.quiz.title=lecture.name;
  }

  getLectureContent(id:Number){
    this.userService.getLectureContent(this.token,id).then(file=>{
      this.lectureContent=file;
      // this.lectureContent.fileDownloadUri = file.fileDownloadUri;
      this.lectureContent.classroom= file.classroom;
      this.lectureContent.course=file.course;
      this.lectureContent.data=file.data;
      this.lectureContent.fileId=file.fileId;
      this.lectureContent.fileType=file.fileType;
      this.trustedDashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(file.fileDownloadUri);
      // this.lectureContent.fileDownloadUri = this.trustedDashboardUrl;
      // console.log(this.lectureContent);

    })
  }

  pdfTrustedURL() {
    console.log("http://docs.google.com/gview?url="+this.lectureContent.fileDownloadUri+"&embedded=true");
    return this.sanitizer.bypassSecurityTrustResourceUrl("http://docs.google.com/gview?url="+this.lectureContent.fileDownloadUri+"&embedded=true");
    // return this.sanitizer.bypassSecurityTrustUrl(this.lectureContent.fileDownloadUri);
  }

  videoURL(){
    console.log(this.lectureContent.fileDownloadUri);
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.lectureContent.fileDownloadUri);

  }

  isvideo(){
    if (this.lectureContent.fileType.search("video") == -1 ) { 
      return  false
   } else { 
      return true
    }
  }
    


}
