import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loginForm: NgForm;
  successMessage: string;
  errorMessage: string;
  isCharity;
  userCheck;
  user;
  welcome = localStorage.getItem('username');
  type = localStorage.getItem('type')
  badLogin;


  //ViewChild is used here so that we can "watch" the loginform for any changes made to the DOM. 
  @ViewChild('loginForm') currentForm: NgForm;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() { this.checkUser() }

  checkUser() {
    if (this.type == "User") {
      this.router.navigateByUrl('/dogooder');
      this.type == null;

    }
    else if (this.type == "Charity") {
      this.router.navigateByUrl('/charity');
      this.type == null;
    }
  }


  loginUser(user: NgForm) { //function to login an existing user or charity.
    this.dataService.addRecord("sessions", user.value)
      .subscribe(

      user => {
        this.successMessage = "login successful";
        this.welcome = user.firstName
        //use local storage to store the userid, username and type as user navigates throughout the site.
        localStorage.setItem('userid', user.id);
        localStorage.setItem('username', user.firstName);
        localStorage.setItem('type', user.isCharity);
        this.badLogin = false
        if (user.isCharity == "User") {
          this.router.navigateByUrl('/dogooder');
        }
        else if (user.isCharity == "Charity") {
          this.router.navigateByUrl('/charity');
        }

      },
      error => {
        this.errorMessage = <any>error
        this.badLogin = true
      }
      );
    this.user = '';
    ;

  }

  onChange() {
    if (this.isCharity == "User") {
      this.userCheck = true
    }
    else if (this.isCharity == "Charity") { this.userCheck = false };
  }

  logOut() { //function to log-out user
    localStorage.removeItem("username")
    localStorage.removeItem("type")
    this.router.navigateByUrl('/home');
    this.welcome = null;
    this.user = null;
  }
  //  function for sending username upon bad login
  forgotPassword(userPassword) { //function to save a user once one has been added.
    this.dataService.passwordReset("sendgrid/getpassword", userPassword)
      .subscribe(
      user => {
        this.successMessage = "login successful";
      },
      error => this.errorMessage = <any>error
      );
    this.user = '';
    ;
  }

  formErrors = {
    'username': '',
    'password': '',
  };

  validationMessages = {
    'username': {
      'required': 'A username is required',
      'minlength': 'Username must be a minimum of 2 characters long',
      'maxlength': 'Username cannot be more than 30 characters long'
    },
    'password': {
      'required': 'A password is required',
      'minlength': 'Password must be a minimum of 6 characters long',
      'maxlength': 'Password cannot be more than 12 characters long'
    },
  }
}


