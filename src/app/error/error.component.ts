import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }
  
  onCLick(){
    // console.log("here before");

    this.router.navigateByUrl('/home', {skipLocationChange: true});
    this.location.replaceState('/error');
    // console.log("here after");
  }

  backClicked() {
    this.location.back();
  }

  homeClicked() {
    this.router.navigateByUrl('/home');
  }
}
