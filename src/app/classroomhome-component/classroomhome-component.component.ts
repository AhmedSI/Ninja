import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '.././user-service.service';
// import { Course } from '.././Course';
import { Classroom } from '.././Classroom';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-classroomhome-component',
  templateUrl: './classroomhome-component.component.html',
  styleUrls: ['./classroomhome-component.component.css']
})
export class ClassroomhomeComponentComponent implements OnInit {
  token:string;
  id:number;
  classroom:Classroom;
  img: string ="../assets/coursepic.png";
  constructor(private router: ActivatedRoute, private userService: UserServiceService, private route: Router) {

   }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.id = +this.router.snapshot.paramMap.get("id");
    this.getCourses();
  }
  getCourses(){
    this.userService.getClassroomById(this.token,this.id).then(
      classroom=>{
        this.classroom = classroom;
        if (this.classroom.classroom_picture.fileDownloadUri !== null){
          this.img = this.classroom.classroom_picture.fileDownloadUri;
        }
      }
    );
  }

}
