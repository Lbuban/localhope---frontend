import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { DataTablesModule } from 'angular-datatables';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ActivatedRoute, Params } from '@angular/router';
import {Router} from '@angular/router';


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
  userId = parseInt(localStorage.getItem('userid'));
  needs;
  editNeed: any;
  needid: number;


  constructor(private dataService: DataService, private router: Router) { }

  sampleForm: NgForm;
  editForm: NgForm;
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

  postuser() {
    console.log(this.userId)
  }

  saveNeed(need: NgForm) { //function to save a need once one has been added.
    console.log(this.model)
    this.dataService.addCharityNeed("charity", this.userId, need.value)
          .subscribe(
            need => {this.successMessage = "Need added successfully";
            
            },
            error =>  this.errorMessage = <any>error);
            this.need = '';
            this.getNeeds();
            this.sampleForm.reset();
    }
  
  saveEditedNeed(need: NgForm) { //function to save an edited need.
    console.log()
    this.dataService.editRecord("updateneed", need.value, need.value.id)
      .subscribe(
      need => {
      this.successMessage = "Need added successfully";
      },
      error => this.errorMessage = <any>error);
    this.need = '';
    setTimeout((jQuery("#closeButton").click()), 500)
    this.getNeeds();
  }

  getNeeds() { //function to pull the needs list.
    this.dataService.getCharityNeeds(this.userId)
      .subscribe(
      needs => this.needs = needs,
      error => this.errorMessage = <any>error);

  }

  getRecordForEdit(need: any) { //function to edit a selected charity need // GET /need/:need_id
    this.editNeed = need;
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


  deleteCharityNeed(needid:number) { //function to delete a student from the record. 
        this.dataService.deleteRecord("deleteneed", needid)
        
          .subscribe(
            need => {this.successMessage = "Need deleted successfully";
            },
            error =>  this.errorMessage = <any>error);
            
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
      'required': 'Type is required.'
    },
    'originalAmount': {
      'required': 'Amount is required.'
    },
    'description': {
      'required': 'Description is required.',
      'maxlength': 'Description cannot exceed 150 characters'
    },
    'dateNeeded': {
      'required': 'Date is required.',
    }
  };
}
