import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { DataService } from '../data.service'

@Component({
  selector: 'app-charity',
  templateUrl: './charity.component.html',
  styleUrls: ['./charity.component.css']
})
export class CharityComponent implements OnInit {


  //these describe what kind of data these variables can have - i.e. string, number, array, etc. 
  successMessage: string;
  errorMessage: string;
  need: string;
  userId = localStorage.getItem('userid');
  needs;


  constructor(private dataService: DataService) { }

  sampleForm: NgForm;
  @ViewChild('sampleForm') currentForm: NgForm;

  model: object = { //"model" is potato.
    type: "",
    originalAmount: "",
    description: "",
    dateNeeded: ""
  };

  ngOnInit() {
    this.postuser()
    this.getNeeds()
  }

 postuser (){
   console.log(this.userId)
 }
  
  saveNeed(need: NgForm){ //function to save a need once one has been added.
    console.log(this.model) 
    this.dataService.addCharityNeed("charity", this.userId, need.value)
          .subscribe(
            student => this.successMessage = "Need added successfully",
            error =>  this.errorMessage = <any>error);
            this.need = '';
    }

    getNeeds() { //function to pull the needs list.
      this.dataService.getCharityNeed("charity", this.userId)
        .subscribe(
          needs => this.needs = needs,
          error =>  this.errorMessage = <any>error);
         
    }

    ngAfterViewChecked() {
      this.formChanged();
    }
  
    formChanged() {
      //if the form didn't change then do nothing
      if (this.currentForm === this.sampleForm) { return; }
      //set the form to the current form for comparison
      this.sampleForm = this.currentForm;
      //subscribe to form changes and send the changes to the onValueChanged method
      this.sampleForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
     
    }
   
    onValueChanged(data?: any) {
      let form = this.sampleForm.form;
  
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
      'description': '',
      'dateNeeded': ''
    };
  
    validationMessages = {
      'type': {
        'required':      'Type is required.'
      },
      'originalAmount': {
        'required':      'Amount is required.'
      },
      'description': {
        'required':      'Description is required.',
        'maxlength':     'Description cannot exceed 150 characters'
      },
      'dateNeeded': {
        'required':       'Date is required.',
      }
    };
  }
