import { Component, OnInit } from '@angular/core';
import { CharityService } from '../charity.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  user;
  // welcome = localStorage.getItem('username');

  constructor(private charityService: CharityService, private router: Router) { } 

  ngOnInit() {
  }


  // loginUser(user: NgForm) { //function to login an existing user or charity.
  //   this.charityService.addRecordOnReset("resetpassword", userName)
  //     .subscribe(
  //     user => {
  //       this.successMessage = "login successful";
  
  //     },
  //     error => this.errorMessage = <any>error

  //     );

  //   this.user = '';
  //   ;

  // }
}
