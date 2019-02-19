import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '.././user-service.service';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
	token: string = "initial";
	selectedFiles: FileList;
	currentFileUpload: File;

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
 
    this.currentFileUpload = this.selectedFiles.item(0);
    this.userService.pushFileToStorage(this.currentFileUpload,this.token).then(event => {
      console.log(event);
    });
 
    this.selectedFiles = undefined;
  }
}
