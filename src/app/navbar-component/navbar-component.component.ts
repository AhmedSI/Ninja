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
import { User } from '../User';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Location } from '@angular/common';

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
  user: User;
  newURL:string="";

  constructor(
  private userService: UserServiceService,
    private router: Router,
     private cdRef: ChangeDetectorRef,
      private _snackBar: MatSnackBar,
      private location: Location

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
    this.user=new User();
    this.checkUserPermisions();
    this.getCategories();
    this.getCourseForSearsh();
    this.getUserData();
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

  getUserData(){
  	this.userService.getUserData(this.token)
      .then(user => {this.user = user;});
  }

  route(id){

    console.log("route"+ id);
    // this.router.navigateByUrl('/category/'+id);

    // this.router.navigated = false;
    // this.router.navigate(['/category/'+id]);

    // this.router.navigate(['/category'+'/'+id]);

    // this.router.navigateByUrl('/register');

    this.router.navigateByUrl('/category'+'/'+id, {skipLocationChange: true}).then(()=>
        this.router.navigate(['/category'+'/'+id]));

    
    // this.location.replaceState('/category/'+id);

    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    // this.router.navigate([uri]));

  }

}
