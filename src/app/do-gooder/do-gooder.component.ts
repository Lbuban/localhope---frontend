import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; //this is pulling info from the data service
// import { MdDialog, MdDialogRef } from '@angular/material';
import { CharityService } from '../charity.service'

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
  charities;

  constructor( 
    private dataService: DataService,
    private charityService: CharityService

  ) {} 

  ngOnInit() 
  { 
    this.getNeeds();
    this.getCharities("411867244");
  }

  getNeeds() { //function to pull the needs list.
    this.dataService.getRecords("dogooder")
      .subscribe(
        needs => this.needs = needs,
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

  //endpoint will be dogooderid
  // followCharity(endpoint: string, record:object): Observable<any> {
  //   let apiUrl = `${this.baseUrl/user/}${endpoint}`;
  //   console.log(apiUrl)
  //   return this.http.post(apiUrl, record)
  //       .map(this.extractData);
  // }
}
