import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; //this is pulling info from the data service
// import { MdDialog, MdDialogRef } from '@angular/material';
import { CharityService } from '../charity.service'
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-do-gooder',
  templateUrl: './do-gooder.component.html',
  styleUrls: ['./do-gooder.component.css']
})
export class DoGooderComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  
  dtTrigger = new Subject();

  errorMessage: string;
  successMessage: string;
  needs: any[];
  need;
  needId;
  users;
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
    this.dtOptions = {
      pagingType: "full_numbers"
    }
    this.getNeeds();
    this.getUser();
  }

  getNeeds() { //function to pull the needs list.
    this.dataService.getRecords("dogooder")
      .subscribe(
        needs => {this.needs = needs;
        },
        error =>  this.errorMessage = <any>error);
        
  }

  getUser(){
      this.dataService.getCharityNeed("user/followedcharities", this.userId)
      
      .subscribe(
        users => {this.users = users},
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
            this.getUser();},
            error =>  this.errorMessage = <any>error);
            this.need = '';
    }

    unfollowCharity(charityId){ //function to save a need once one has been added.
    
    this.dataService.postFollowCharity("user/unfollowcharity", this.userId, JSON.stringify(charityId))
    
          .subscribe(
            charity => {this.successMessage = "Need added successfully";
            this.getUser();},
            error =>  this.errorMessage = <any>error);
            this.need = '';
    }
  
    giveNeed(needId){ //function to save a need once one has been added.
    
    let idJSON= JSON.stringify(this.userId)
    console.log(idJSON)
    this.dataService.postNeedMet("needstatus", needId, idJSON)
    
          .subscribe(
            need => {this.successMessage = "Need added successfully";
            this.getNeeds();},
            error =>  this.errorMessage = <any>error);
            this.need = '';
    }
      
    
}
