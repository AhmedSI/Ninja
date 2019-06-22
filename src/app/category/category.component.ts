import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { Course } from '../Course';
import { Category } from '../Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
	category: string;
	courses: Course[];
  token : string ="initial";
  categories: Category[];
  cat:string;
  constructor(
  private userService:UserServiceService,
    private router: ActivatedRoute
    ) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
  	this.category = this.router.snapshot.paramMap.get("category");
    this.getCourses();
    this.getCategories();
  }
  getCategories() {
    this.userService.getCategories().then(categories => {
      this.categories = categories;for (var i =0;i< this.categories.length;i++){
        if (this.categories[i].categoryId == +this.category){
          this.cat = this.categories[i].categoryStr;
          break;
        }
      }
    });
  }
  getCourses(){
  	this.userService.getCoursesByCategoryId(this.category)
    .then(courses => {
        this.courses=courses;
    });

  }
}
