import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserServiceService } from '.././user-service.service';

import { Category } from '../Category';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit{
	token: string = "initial";
  isAdmin : boolean = false;

  

  categories : Category[];

  constructor(
  private userService: UserServiceService,
    private router: Router ,private cdRef : ChangeDetectorRef
    ) { }

  ngOnInit() {
  	this.token = localStorage.getItem('token');
    this.checkUserPermisions();
    this.getCategories();
  
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
