import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '.././user-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../Course';
import { Section } from '../Section';
import { Lecture } from '../Lecture';
import { Quiz } from '../Quiz';
import { fileContent } from '../fileContent';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {
  ClickEvent,
} from 'angular-star-rating';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {
  token: string = "initial";
  id: string;
  course: Course;
  sections: Section[];
  lectures: Lecture[][];
  quiz: Quiz = new Quiz();
  selectedLecture: Number;
  lecture: Lecture = new Lecture();
  fileSrc: string;
  trustedDashboardUrl: SafeUrl;
  lectureContent: fileContent;
  request: string;
  toggeled: number[]=[];
  openedlecture:string="";
  ratetitle: string ="Rate This Course";
  
  
  constructor(
    private userService: UserServiceService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer, private _snackBar: MatSnackBar
  ) { }
  
  onClick = ($event: ClickEvent) => {
    this.userService.ratCourseForStudent(this.token, +this.id, +$event.rating);
    this._snackBar.open('Sucssefully rated Course By ' + $event.rating + ' Stars', '', {
      duration: 2000,
    });
  };

  ngOnInit() {
    this.course = new Course();
    this.lectureContent = new fileContent();
    this.token = localStorage.getItem('token');
    this.id = this.router.snapshot.paramMap.get("id");
    this.getCourseById();
  }

  getCourseById() {
    this.userService.getCourseById(this.token, this.id)
      .then(coursef => {
        this.course = JSON.parse(JSON.stringify(coursef))
        console.log(this.course);
      });
  }

  setLecture(lecture: Lecture) {
    this.lecture = lecture;
    let lectureId = lecture.lectureContentId;
    this.selectedLecture = lectureId;
    this.getLectureContent(lectureId);
  }



  quizModal(lecture: Lecture) {
    this.quiz.title = lecture.name;
    this.quiz.quizId = lecture.lectureId;
    this.openedlecture = lecture.name;
    console.log(this.quiz.quizId);
  }

  getLectureContent(id: Number) {
    this.userService.getLectureContent(this.token, id).then(file => {
      this.lectureContent = file;
      // this.lectureContent.fileDownloadUri = file.fileDownloadUri;
      this.lectureContent.classroom = file.classroom;
      this.lectureContent.course = file.course;
      this.lectureContent.data = file.data;
      this.lectureContent.fileId = file.fileId;
      this.lectureContent.fileType = file.fileType;
      this.trustedDashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(file.fileDownloadUri);
      // this.lectureContent.fileDownloadUri = this.trustedDashboardUrl;
      // console.log(this.lectureContent);

    })
  }
  togglearrow(index: number) {
    var flag = true;
    for (var i = 0; i < this.toggeled.length; i++) {
      if (this.toggeled[i] === index) {
        this.toggeled.splice(i, 1);
        flag = false;
        break;
      }
    }
    if (flag){
      this.toggeled.push(index);
    }

  }

  pdfTrustedURL() {
    console.log("http://docs.google.com/gview?url=" + this.lectureContent.fileDownloadUri + "&embedded=true");
    return this.sanitizer.bypassSecurityTrustResourceUrl("http://docs.google.com/gview?url=" + this.lectureContent.fileDownloadUri + "&embedded=true");
    // return this.sanitizer.bypassSecurityTrustUrl(this.lectureContent.fileDownloadUri);
  }

  videoURL() {
    console.log(this.lectureContent.fileDownloadUri);
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.lectureContent.fileDownloadUri);

  }

  isvideo() {
    if (this.lectureContent.fileType.search("video") == -1) {
      return false
    } else {
      return true
    }
  }

  setlectertitle(title:string,lect:string){
    document.getElementById(lect).innerHTML = title;
    console.log(title,lect);
  }


}
