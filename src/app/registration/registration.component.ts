import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import {Router} from '@angular/router';


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

 constructor(private dataService: DataService, private router: Router) { } 

  // onSubmit() { //function to submit the data once the button is clicked.
  //   // console.log(this.sampleForm) //.value gets us the value of the form field. Data is potato.
  //   console.log(this.model);
  // }

  ngOnInit() {
    
  }

  registerUser(user: NgForm){ //function to save a user once one has been added.
    // console.log(JSON.stringify(user.value))
    this.dataService.addRecord("registration", user.value)
      .subscribe(
        user => {
          this.successMessage = "Need added successfully";
          console.log(user.isCharity)
            if (user.isCharity=="User") {
              this.router.navigateByUrl('/dogooder'); 
            }
            else if (user.isCharity=="Charity") {
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
      if (this.currentForm === this.registrationForm) { return; }
      //set the form to the current form for comparison
      this.registrationForm = this.currentForm;
      //subscribe to form changes and send the changes to the onValueChanged method
      this.registrationForm.valueChanges
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



