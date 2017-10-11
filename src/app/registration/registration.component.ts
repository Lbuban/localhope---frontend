import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: NgForm;
  successMessage: string;
  errorMessage: string;
  isCharity;
  userCheck;
  user;
  @ViewChild('registrationForm') currentForm: NgForm;

 constructor(private dataService: DataService) { } 

  // onSubmit() { //function to submit the data once the button is clicked.
  //   // console.log(this.sampleForm) //.value gets us the value of the form field. Data is potato.
  //   console.log(this.model);
  // }

  ngOnInit() {
    
  }

  registerUser(user: NgForm){ //function to save a need once one has been added.
      this.dataService.addRecord("registration", user.value)
          .subscribe(
            student => this.successMessage = "Need added successfully",
            error =>  this.errorMessage = <any>error);
            this.user = '';
    }

    ngAfterViewChecked() {
      this.formChanged();
    }
  
    formChanged() {
      //if the form didn't change then do nothing
      if (this.currentForm === this.registrationForm) { return; }
      //set the form to the current form for comparison
      this.registrationForm = this.currentForm;
      //subscribe to form changes and send the changes to the onValueChanged method
      this.registrationForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
     
    }

    onChange(){
  event.preventDefault()
  if (this.isCharity=="User") 
    {
     this.userCheck=true}
  else if (this.isCharity=="Charity")  
     {this.userCheck=false};
  }
   
    onValueChanged(data?: any) {
      let form = this.registrationForm.form;
  
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
  
    //start out the errors as an emtpy string

    // MJ: this code as here; commenting out to write my own errors/validation msgs below:
    // formErrors = {
    //   'type': '',
    //   'originalAmount': '',
    //   'description': ''
    // };
  
    // validationMessages = {
    //   'type': {
    //     'required':      'Type is required.',
    //   },
    //   'originalAmount': {
    //     'required':      'Amount is required.',
    //   },
    //   'description': {
    //     'required':      'Description is required.',
    //     'maxlength':     'Description cannot exceed 150 characters'
    //   },
    // };
  formErrors = {
    'username': '',
    'password': '',
    'firstName': '',
    'lastName': '',
    'streetAddress': '',
    'city': '',
    'state': '',
    'zip': '',
    'phone': '',
    'email': '',
    'ein': '',
    'charityName': '',
    'charityUserRole': '',
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
    'firstName': {
      'required': 'A First Name is required',
      'minlength': 'First Name must be a minimum of 2 characters long',
      'maxlength': 'First Name cannot be more than 200 characters long'
    },
    'lastName': {
      'required': 'A Last Name is required',
      'minlength': 'Last Name must be a minimum of 2 characters long',
      'maxlength': 'Last Name cannot be more than 200 characters long'
    },
    'streetAddress': {
      'required': 'A Street Address is required',
      'maxlength': 'Street Address cannot be more than 200 characters long'
    },
    'city': {
      'required': 'A City is required',
      'maxlength': 'City cannot be more than 50 characters long'
    },
    'state': {
      'required': 'A State is required',
      'maxlength': 'State cannot be more than 2 characters long'
    },
    'zip': {
      'required': 'A Zip Code is required',
      'maxlength': 'Zip Code cannot be more than 10 characters long'
    },
    'phone': {
      'required': 'A phone number is required',
      'maxlength': 'Phone number cannot be more than 15 characters long'
    },
    'email': {
      'required': 'A email is required',
      'maxlength': 'Email cannot be more than 100 characters long'
    },
    'ein': {
      'required': 'A EIN is required',
      'maxlength': 'EIN cannot be more than 10 characters long'
    },
    'charityName': {
      'required': 'A charityName is required',
      'maxlength': 'charityName cannot be more than 200 characters long'
    },
    'charityUserRole': {
      'required': 'A Charity User Role is required',
      'maxlength': 'Charity User Role cannot be more than 20 characters long'
    },
  };
};
// adding code example:
    // formErrors = {
    //   'first_name': '',
    //   'last_name': '',
    //   'sat': '',
    //   'start_date': '',
    //   'gpa': ''
  
    // };
  
    // validationMessages = {
    //   'first_name': {
    //     'required': 'First name is required.',
    //     'minlength': 'First name must be at least 2 characters long.',
    //     'maxlength': 'First name cannot be more than 30 characters long.'
    //   },

  // }



