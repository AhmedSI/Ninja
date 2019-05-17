import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserServiceService } from '.././user-service.service';
import { Category } from '../Category';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.css']
})
export class FooterComponentComponent implements OnInit {
	categories : Category[];
  constructor(
  	private userService: UserServiceService,
    private router: Router
  ) { }

  ngOnInit() {
  	this.getCategories();
  }

	getCategories(){
		this.userService.getCategories().then(categories=>{
		  this.categories = categories;
		});
  	}

}
