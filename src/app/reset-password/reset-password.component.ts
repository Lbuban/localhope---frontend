import { Component, OnInit, ViewChild } from '@angular/core';
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
  resetForm;
  badReset=false;

  @ViewChild('resetForm') currentForm: NgForm;

  model: object = { //"model" is potato.
  username: "",
  resetNumber: "",
  password: "",
};

  constructor(private charityService: CharityService, private router: Router) { } 

  ngOnInit() {
  }


  resetPassword(user: NgForm) { //function to reset a password.
    console.log(this.model)
    this.charityService.addRecordOnReset("resetpassword", this.model)
      .subscribe(
      user => {
        this.successMessage = "reset successful";
        this.router.navigateByUrl('/home');

        
      },
      error => {this.errorMessage = <any>error
      this.badReset=true}
      );
    this.user = '';
    ;
  }
  ngAfterViewChecked() {
    this.formChanged();
  }

  
  formChanged() {
    //if the form didn't change then do nothing
    if (this.currentForm === this.resetForm) { return; }
    //set the form to the current form for comparison
    this.resetForm = this.currentForm;
    //subscribe to form changes and send the changes to the onValueChanged method
    this.resetForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
   
  }

 
  onValueChanged(data?: any) {
    let form = this.resetForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
    

  formErrors = {
    'verificationCode': '',
    'username': '',
    'password': '',
  };

  validationMessages = {
    'verificationCode': {
      'required': 'A verification code is required'
    },
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
  };
}

