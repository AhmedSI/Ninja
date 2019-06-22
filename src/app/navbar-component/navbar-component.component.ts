import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserServiceService } from '.././user-service.service';
import {Observable, from} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Category } from '../Category';
import { FormControl } from '@angular/forms';
import { Course } from '../Course';
import { NgForm } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router' ;

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit{
	token: string = "initial";
  isAdmin : boolean = false;
  myControl = new FormControl();
  options: Course[] ;
  filteredOptions: Observable<Course[]>;
  categories : Category[];
  nas:string;
  constructor(
  private userService: UserServiceService,
    private router: Router ,private cdRef : ChangeDetectorRef
    ) { }
  


  navigateTo(value:NgForm) {
    for (var i in this.options)
    {
      if (this.options[i].title == this.nas){
        this.router.navigate(['/course/' + this.options[i].courseId]);
        console.log(i)
        break;
      }
    }
    
    
  }
  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) {
      if (future.url.toString() === 'view' && curr.url.toString() === future.url.toString()) {
        return false;
      }
      return (future.routeConfig === curr.routeConfig);
    };
  	this.token = localStorage.getItem('token');
    this.checkUserPermisions();
    this.getCategories();
    this.getCourseForSearsh();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value):[])
      );
  }
  private _filter(value: string): Course[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.title.toLowerCase().includes(filterValue));
  }
  getCourseForSearsh(){
    this.userService.getAllCoursesForsearch().then(options => {this.options = options;});
  }
  logoutUser(): void {
    
    this.userService.logoutUser(this.token)
      .then(str => {        
        console.log(str);
      });
      localStorage.removeItem('token');
       console.log(localStorage.getItem('token'));
      this.router.navigate(['/login']);

  }

  checkUserPermisions(){
    this.userService.getUserData(this.token).then(user=>{
      if(user.username == "Admin") this.isAdmin = true;
    });
  }

  getCategories(){
    this.userService.getCategories().then(categories=>{
      this.categories = categories;
    });
  }


}
