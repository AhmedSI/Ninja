import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-alternative-search',
  templateUrl: './alternative-search.component.html',
  styleUrls: ['./alternative-search.component.css']
})
export class AlternativeSearchComponent implements OnInit {


  id:string;
  constructor(private router: ActivatedRoute,private route:Router) { }

  ngOnInit() {
    this.id = this.router.snapshot.paramMap.get("id");
    this.route.navigate(['/course/' + this.id]);
  }

}
