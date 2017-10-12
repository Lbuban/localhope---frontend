import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import {Router} from '@angular/router';

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

  @ViewChild('loginForm') currentForm: NgForm;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }
  loginUser(user: NgForm){ //function to login a new or existing user.
    // console.log(JSON.stringify(user.value))
    this.dataService.addRecord("sessions", user.value)
      .subscribe(
        user => {
          this.successMessage = "login successful";
          console.log(user.id)
            if (user.isCharity=="User") {
              localStorage.setItem('userid', user.id);
              this.router.navigateByUrl('/dogooder'); 
            }
            else if (user.isCharity=="Charity") {
              localStorage.setItem('userid', user.id);
              this.router.navigateByUrl('/charity'); 
            }
        },
        error => this.errorMessage = <any>error
       
      );

    this.user = '';
    ;

            
    }

    ngAfterViewChecked() {
      this.formChanged();
    }
  
    formChanged() {
      //if the form didn't change then do nothing
      if (this.currentForm === this.loginForm) { return; }
      //set the form to the current form for comparison
      this.loginForm = this.currentForm;
      //subscribe to form changes and send the changes to the onValueChanged method
      this.loginForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
     
    }

    onChange(){
 
  if (this.isCharity=="User") 
    {
     this.userCheck=true}
  else if (this.isCharity=="Charity")  
     {this.userCheck=false};
  }
   
  onValueChanged(data?: any) {
    let form = this.loginForm.form;

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


