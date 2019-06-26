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
import { MatSnackBar } from '@angular/material/snack-bar';
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
  uniqueoptions:Course[]=[];
  filteredOptions: Observable<Course[]>;
  categories : Category[];
  nas:string;
  constructor(
  private userService: UserServiceService,
    private router: Router, private cdRef: ChangeDetectorRef, private _snackBar: MatSnackBar
    ) { }
  


  navigateTo(value:NgForm) {
    for (var i in this.options)
    {
      if (this.options[i].title == this.nas){
        this.router.navigate(['/search/'+ this.options[i].title]);
        return;
      }
    }
    if (this.nas !== '' && this.nas !== undefined ){
      this._snackBar.open('No Such ' + '"' + this.nas + '"' +' Course Was Found', '', {
      duration: 3000, panelClass: ['custom-snackbar']
    });
    }
    
    
  }
  ngOnInit() {
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

    return this.uniqueoptions.filter(uniqueoptions => uniqueoptions.title.toLowerCase().includes(filterValue));
  }
  getCourseForSearsh(){
    this.userService.getAllCoursesForsearch().then(options => { this.options = options; this.makeUniqueSearch(this.options);});
  }
  makeUniqueSearch(notUnique:Course[]){
    var uniqe;
    for(var i=0;i < notUnique.length;i++){
      uniqe = true;
      for(var j=i+1;j<notUnique.length;j++){
        if(notUnique[i].title==notUnique[j].title){
          uniqe = false;
          break;
        }
        
      }
      if (uniqe){
        this.uniqueoptions.push(notUnique[i]);
      }
    }
  }
  logoutUser(): void {
    
    this.userService.logoutUser(this.token)
      .then(str => { 
      });
      localStorage.removeItem('token');
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
