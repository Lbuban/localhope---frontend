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
    formErrors = {
      'type': '',
      'originalAmount': '',
      'description': ''
    };
  
    validationMessages = {
      'type': {
        'required':      'Type is required.',
      },
      'originalAmount': {
        'required':      'Amount is required.',
      },
      'description': {
        'required':      'Description is required.',
        'maxlength':     'Description cannot exceed 150 characters'
      },
    };
  }



