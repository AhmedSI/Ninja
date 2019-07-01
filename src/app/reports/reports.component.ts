import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '.././user-service.service';
import { Router,ActivatedRoute} from '@angular/router';
import { Report } from '.././Report';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

	token: string = "initial";
	childId: string;
	reports: Report[];
  constructor(
  	private userService: UserServiceService, 
	private router: ActivatedRoute
	) {}

  ngOnInit() {
  	this.token = localStorage.getItem('token');
  	this.childId = this.router.snapshot.paramMap.get("id");
  	this.getReportsForStudent();
  }

	getReportsForStudent(){
		this.userService.getReportsForChild(this.token,this.childId).then(reports => {
			this.reports = reports;
		});
	}

}
