import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserServiceService } from '.././user-service.service';
import {Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Category } from '../Category';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit{
	token: string = "initial";
  isAdmin : boolean = false;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'cYWNEVgWno',
'OnNxaExUfW',
'KsRDWBabW',
'IzYWkkBoI',
'cgSWKeFwG',
'yDGNhvicBw',
'GtyMhZKr',
'eAkCTybO',
'BivOJtXm',
'jfJkXTlq',
'lrtsRUAM',
'lbOKVSXk',
'SIwdsYli',
'MzFEXHEG',
'AMoIJmHZ',
'xnCJSyaa',
'cWvCafCS',
'MsqIJOCO',
'poIljTmG',
'KZogjZDC'];
  filteredOptions: Observable<string[]>;
  categories : Category[];

  constructor(
  private userService: UserServiceService,
    private router: Router ,private cdRef : ChangeDetectorRef
    ) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
    this.checkUserPermisions();
    this.getCategories();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value):[])
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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
