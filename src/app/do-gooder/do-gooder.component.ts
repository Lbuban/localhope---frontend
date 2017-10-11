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
    this.dataService.getRecords("dogooder")
      .subscribe(
        needs => this.needs = needs,
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
