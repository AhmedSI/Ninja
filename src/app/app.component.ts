
import { Component ,Input, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  token: string = "initial";

  constructor(
    private router: Router,
    private activeRoute : ActivatedRoute,
    private location: Location


  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      // console.log(this.activeRoute);
      console.log(window.location.pathname);

      if( window.location.pathname ==='/**' ){
        this.router.navigateByUrl('/error', {skipLocationChange: true});
        this.location.replaceState('');
      }
      else if( window.location.pathname ==='/'){
        this.router.navigateByUrl('/home', {skipLocationChange: true});
        this.location.replaceState('');
      }

    }
    // else if(this.router.url === '/home'){
    //   this.router.navigateByUrl('/home', {skipLocationChange: true});
    //   this.location.replaceState(''); 
    // }
    else{
      if(window.location.pathname ==='/login' ){
        this.router.navigateByUrl('/login');
      }
      else if(window.location.pathname ==='/register'){
        this.router.navigateByUrl('/register');

      }
      else
      this.router.navigateByUrl('/landing', {skipLocationChange: true});
      this.location.replaceState('');
    } 


  }

  

}
