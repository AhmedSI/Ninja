import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { Course } from '../Course';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
	category: string;
	courses: Course[];
	token : string ="initial";
  constructor(
  private userService:UserServiceService,
    private router: ActivatedRoute
    ) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
  	this.category = this.router.snapshot.paramMap.get("category");
  	this.getCourses();
  }

  getCourses(){
  	this.userService.getCoursesByCategory(this.category)
    .then(courses => {
        this.courses=courses;
    });

  }
}
