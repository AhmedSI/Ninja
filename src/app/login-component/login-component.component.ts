import { Component, OnInit } from '@angular/core';
import { User } from '.././User';
import { NgModule } from '@angular/core';
import { UserServiceService } from '.././user-service.service';
import {NgForm} from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  newUser: User = new User();
  token: string = "initial";
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  showPassword:boolean;
  show= false;
  input:string= "password";

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    ) {}

  get f() { return this.loginForm.controls; }

  toggleShow(){
      this.show = !this.show;
      if (this.show){
          //change the type to text
          this.input="text";
          // this.input.nativeElement.type='text';

      }
      else {
        this.input="password";
                    //change the type to password
      }
  }


  ngOnInit(){
    this.token = localStorage.getItem('token');
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  onSubmit(){
    if (this.loginForm.invalid){
      this.submitted=true;
      // console.log("invalid login");
      // console.log(this.loginForm);
     return;
    }

    this.newUser.email=this.loginForm.value.email;
    this.newUser.password=this.loginForm.value.password;

    // console.log(this.loginForm.value);
    // this.userService.loginUser(loginForm.value.email,loginForm.value.password)
    this.userService.loginUser(this.newUser.email,this.newUser.password)
      .then(accesstoken => {        
        this.loginForm.reset();
        // this.token = accesstoken.substring(30,accesstoken.length);
        this.token=accesstoken;
        localStorage.setItem('token', this.token);
        console.log(this.token);
        this.router.navigate(['/home']);
      });
  }

}

