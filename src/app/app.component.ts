
import { Component ,Input, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor(
    private router: Router,
    private activeRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('token')) console.log(this.activeRoute);
    else this.router.navigate(['/register']);
  }

  

}
