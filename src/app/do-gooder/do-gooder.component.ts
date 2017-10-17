import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service'; //this is pulling info from the data service
// import { MdDialog, MdDialogRef } from '@angular/material';
import { CharityService } from '../charity.service'
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
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
  giveNeed: any;
  users;
  mode = 'Observable';
  charities;
  userId = localStorage.getItem('userid');
  charityJSON;

  constructor( 
    private dataService: DataService,
    private charityService: CharityService

  ) {} 

  @ViewChild(DataTableDirective) dataTableElement: DataTableDirective;

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
          this.dataTableElement.dtInstance.then(inst => {
            inst && inst.destroy();
          });
          this.dtTrigger.next();
        },
        error =>  this.errorMessage = <any>error);
        
  }

  getRecordForEdit(need: any) { //function to edit a selected charity need // GET /need/:need_id
    this.giveNeed = need;
  }

  getUser(){
      this.dataService.getCharityNeed("user/followedcharities", this.userId)
      
      .subscribe(
        users => {this.users = users
          this.dataTableElement.dtInstance.then(inst => {
            inst && inst.destroy();
          });
          this.dtTrigger.next();
        },
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
  
    decrementNeed(needId, decrement){ //function to save a need once one has been added.
    let decrementNumber = parseInt(decrement)
    console.log(needId, decrementNumber)
    this.dataService.addDecrementNeed("needreduce", needId, decrementNumber)
    
          .subscribe(
            need => {this.successMessage = "Need added successfully";
            this.getNeeds();},
            error =>  this.errorMessage = <any>error);
            this.need = '';
    }
      
    
}
