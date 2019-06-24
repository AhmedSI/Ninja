import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '.././user-service.service';
import { Router,ActivatedRoute} from '@angular/router';
import { fileContent } from '../fileContent';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {SafeResourceUrl, SafeUrl} from '@angular/platform-browser';




@Component({
  selector: 'app-lecture-contents',
  templateUrl: './lecture-contents.component.html',
  styleUrls: ['./lecture-contents.component.css']
})
export class LectureContentsComponent implements OnInit {

  trustedDashboardUrl : SafeUrl;
  token: string = "initial";
  id:string='';
  lectureContent:fileContent;
  idNum:Number;


  constructor(
    private userService: UserServiceService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {

  this.lectureContent=new fileContent();
  this.token = localStorage.getItem('token');
  this.idNum = +this.router.snapshot.paramMap.get("id");
  this.getLectureContent(this.idNum);

  // console.log(this.lectureContent);

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
      // this.lectureContent.fileDownloadUri = this.trustedDashboardUrl;\

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
