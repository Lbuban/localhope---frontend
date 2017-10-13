import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; //this is pulling info from the data service
// import { MdDialog, MdDialogRef } from '@angular/material';
import { CharityService } from '../charity.service'
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-do-gooder',
  templateUrl: './do-gooder.component.html',
  styleUrls: ['./do-gooder.component.css']
})
export class DoGooderComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  needs: any[];
  need;
  mode = 'Observable';
  charities;
  userId = localStorage.getItem('userid');
  charityJSON;

  constructor( 
    private dataService: DataService,
    private charityService: CharityService

  ) {} 

  ngOnInit() 
  { 
    this.getNeeds();
    // this.getCharities();
  }

  getNeeds() { //function to pull the needs list.
    this.dataService.getRecords("dogooder")
      .subscribe(
        needs => {this.needs = needs},
        error =>  this.errorMessage = <any>error);
       
  }


  getCharities(ein: string) { //function to pull the charity list.
    this.charityService.getCharityList(ein)
      .subscribe(
        charities => {
          this.charities = charities;
          console.log(charities)
          },
        error =>  this.errorMessage = <any>error);
  }



  followCharity(charityId){ //function to save a need once one has been added.
    console.log(JSON.stringify(charityId))
    this.dataService.postFollowCharity("user/followcharity", this.userId, JSON.stringify(charityId))
    
          .subscribe(
            charity => {this.successMessage = "Need added successfully";
            this.getNeeds();},
            error =>  this.errorMessage = <any>error);
            this.need = '';
    }
}
