import { Component, OnInit ,Input} from '@angular/core';
import { User } from '.././User';
import { NgModule } from '@angular/core';
import { UserServiceService } from '.././user-service.service';
import {NgForm} from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Directive } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms'



@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

  PasswordValidator(confirmPasswordInput: string) {
    let confirmPasswordControl: FormControl;
    let passwordControl: FormControl;
  
    return (control: FormControl) => {
      if (!control.parent) {
        return null;
      }
  
      if (!confirmPasswordControl) {
        confirmPasswordControl = control;
        passwordControl = control.parent.get(confirmPasswordInput) as FormControl;
        passwordControl.valueChanges.subscribe(() => {
          confirmPasswordControl.updateValueAndValidity();
        });
      }
  
      if (
        passwordControl.value !==
        confirmPasswordControl.value
      ) {
        return {
          notMatch: true
        };
      }
      return null;
    };
  }

  get f() { return this.registerForm.controls; }

  newUser: User = new User();
  registerForm:FormGroup;
  submitted = false;
  hidden=true;
  status:string ="active";
  status1:string="inactive";
  loading = false;
  errorExisted:boolean = false;
  errorMessage:string;
  constructor(
    private userService: UserServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}


  ngOnInit() {
    if(localStorage.getItem('token')) this.router.navigate(['/home']);
      this.registerForm = this.formBuilder.group({
        firstName:['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email:['',[Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword:['',[Validators.required,this.PasswordValidator('password')]],
        gender:['', Validators.required],
        dateOfBirth:['',Validators.required]
      });
      // this.newUser.firstName=this.registerForm.value.firstName;
      // this.newUser.lastName=this.registerForm.value.lastName;
      // this.newUser.password=this.registerForm.value.password;
      // this.newUser.username=this.registerForm.get('username').value;
      // this.newUser.email=this.registerForm.get('email').value;
  
  }

  onSubmit(){
    if (this.registerForm.invalid){
      this.submitted=true;
      // console.log("invalid registration");
     return;
    }
    this.newUser.firstName=this.registerForm.value.firstName;
    this.newUser.lastName=this.registerForm.value.lastName;
    this.newUser.password=this.registerForm.value.password;
    this.newUser.email=this.registerForm.value.email;
    this.newUser.username=this.registerForm.value.username;
    this.newUser.dateOfBirth=this.registerForm.value.dateOfBirth;
    if(this.registerForm.value.gender=="Female") this.newUser.gender=2;
    else this.newUser.gender=1;
    // console.log(this.newUser);
    // console.log(this.registerForm.value);
    this.userService.registerUser(this.newUser)
      .then(createUser => {        
        // userForm.reset();
        this.newUser = new User();
        this.router.navigate(['/login']);
      },error=>{
      console.log(error);
      this.errorMessage = error
      this.errorExisted = true;
      });
  }
}



