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
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
	getCategories(){
		this.userService.getCategories().then(categories=>{
		  this.categories = categories;this.categories = this.shuffle(this.categories);
		});
  	}

}
