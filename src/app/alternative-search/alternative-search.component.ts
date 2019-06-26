import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { Course } from '../Course';
import { filter} from 'rxjs/operators';
@Component({
  selector: 'app-alternative-search',
  templateUrl: './alternative-search.component.html',
  styleUrls: ['./alternative-search.component.css']
})
export class AlternativeSearchComponent implements OnInit {
  options: Course[];
  courses:Course[]=[];
  title:string;
  token: string = "initial";
  constructor(private router: ActivatedRoute, private userService: UserServiceService, private route: Router) { }

  ngOnInit() {
    this.route.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getCourseForSearsh();
    });
    
    this.token = localStorage.getItem('token');
    this.getCourseForSearsh();
  }
  getCourseForSearsh() {
    this.courses=[];
    this.title = this.router.snapshot.paramMap.get("course");
    this.userService.getAllCoursesForsearch().then(options => { this.options = options;
    for(var i in this.options){
      if(this.options[i].title == this.title){
        this.getCourseById(this.options[i].courseId);
      }
    };
    });
  }
  getCourseById(courseID) {
    this.userService.getCourseById(this.token, courseID)
      .then(course => { this.courses.push( course);});
  }

}
