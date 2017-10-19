import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
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
  needId;
  giveNeed: any;
  users;
  mode = 'Observable';
  charities;
  userId = localStorage.getItem('userid');
  charityJSON;
  counter = 0;

  constructor(
    private dataService: DataService,
    private charityService: CharityService
  ) { }

  ngOnInit() {
    this.getNeeds();
    this.getUser();
  }


  getNeeds() { //function to pull the needs list from charities with needs.
    // call the dataService and the getRecords function. Pass in the "dogooder" endpoint.
    this.dataService.getRecords("dogooder")
      // once function is called, subscribe/populate the table with needs.
      .subscribe(
      needs => {
      this.needs = needs;
      },
      error => this.errorMessage = <any>error);
  }

  getRecordForEdit(need: any) { //function to edit a selected charity need // GET /need/:need_id
    this.giveNeed = need;
  }

  getUser() {
    this.dataService.getCharityNeed("user/followedcharities", this.userId)

      .subscribe(
      users => {
      this.users = users
      },
      error => this.errorMessage = <any>error);
  }


  resetNeeds(option1, option2, option3, option4, option5) {
    this.charities = null;

    option1.checked = false
    option2.checked = false
    option3.checked = false
    option4.checked = false
    option5.checked = false
    return this.getNeeds();
  };
  findLocalCharities(distance: string) { //function to pull the charity list.
    let distanceNumber = parseInt(distance)
    console.log(this.userId, distanceNumber)
    this.charityService.locateUser("distance", this.userId, distanceNumber)
      .subscribe(
      charities => {
        this.charities = charities;
        console.log(charities)
      },
      error => this.errorMessage = <any>error);
  }




  followCharity(charityId) { //function for a user to follow a selected charity.
    console.log(JSON.stringify(charityId))
    this.dataService.postFollowCharity("user/followcharity", this.userId, JSON.stringify(charityId))

      .subscribe(
      charity => {
      this.successMessage = "Need added successfully";
        this.getUser();
      },
      error => this.errorMessage = <any>error);
    this.need = '';
  }

  unfollowCharity(charityId) { //function for a user to unfollow a selected charity.

    this.dataService.postFollowCharity("user/unfollowcharity", this.userId, JSON.stringify(charityId))

      .subscribe(
      charity => {
      this.successMessage = "Need added successfully";
        this.getUser();
      },
      error => this.errorMessage = <any>error);
    this.need = '';
  }

  decrementNeed(needId, decrement) { //function to save a need once one has been added.
    let decrementNumber = parseInt(decrement)
    console.log(needId, decrementNumber)
    this.dataService.addDecrementNeed("needreduce", needId, decrementNumber)

      .subscribe(
      need => {
      this.successMessage = "Need added successfully";
        this.getNeeds();
      },
      error => this.errorMessage = <any>error);
    this.need = '';
  }

  decreaseOne() {

    this.counter--;
  }


  increaseOne() {

    this.counter++;

  }
  closeModal() {
    this.counter = 0;
    return setTimeout((jQuery("#closeButton").click()), 500)
  }
}
