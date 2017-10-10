import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; //this is pulling info from the data service
// import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-do-gooder',
  templateUrl: './do-gooder.component.html',
  styleUrls: ['./do-gooder.component.css']
})
export class DoGooderComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  needs: any[];
  mode = 'Observable';

  constructor( 
    private dataService: DataService
  ) {} 

  ngOnInit() 
  { 
    this.getNeeds();
  }

  getNeeds() { //function to pull the needs list.
    this.dataService.getRecords("needs")
      .subscribe(
        needs => this.needs = needs,
        error =>  this.errorMessage = <any>error);
  }
}
