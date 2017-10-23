import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';


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
  editNeed: any;
  needid: number;
  charityid: number;
  


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


    this.getNeeds()
  }


  saveNeed(need: NgForm) { //function to save a need once one has been added.
    this.dataService.addCharityNeed("charity", this.userId, need.value)
      .subscribe(
      need => {
        this.successMessage = "Need added successfully";

      },
      error => this.errorMessage = <any>error);
    this.need = '';
    this.getNeeds();
    this.sampleForm.reset();
  }

  saveEditedNeed(need: NgForm) { //function to save an edited need.
    this.dataService.editRecord("updateneed", need.value, need.value.id)
      .subscribe(
        need => {
          this.successMessage = "Need added successfully";
          this.need = '';
          setTimeout((document.getElementById("closeButton").click()), 500);
          this.getNeeds();
        },
        error => this.errorMessage = <any>error
      );
  }

  getNeeds() { //function to pull the needs list.
    this.dataService.getCharityNeeds(this.userId)
      .subscribe(
        needs => this.needs = needs,
        error => this.errorMessage = <any>error
      );

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


  deleteCharityNeed(needId: number) { //function to delete a charity from the record. 
    this.dataService.deleteRecord("deleteneed", needId, JSON.stringify(this.userId))
      .subscribe(
      need => {
      this.successMessage = "Need deleted successfully";
      },
      error => this.errorMessage = <any>error);
  }
  notifyFollowers(charityID: number, needID: number) {

    this.dataService.postNotifyFollowers("message", charityID, needID)
      .subscribe(
      need => {
      this.successMessage = "followers notified successfully";
      },
      error => this.errorMessage = <any>error);
    this.need = '';
    this.getNeeds();
    this.sampleForm.reset();
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
