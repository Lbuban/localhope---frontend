import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { CharityService } from '../charity.service'
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-do-gooder',
  templateUrl: './do-gooder.component.html',
  styleUrls: ['./do-gooder.component.css']
})
export class DoGooderComponent implements OnInit {

  disgtanceForm: NgForm;
  editForm: NgForm;
  @ViewChild('distanceForm') currentForm: NgForm;
  lat = localStorage.getItem('lat');
  long = localStorage.getItem('long');
  userId = localStorage.getItem('userid');

  model = {
    id:this.userId,
    latitude: this.lat,
    longitude: this.long,
    distance: ""

  };

  errorMessage: string;
  successMessage: string;
  needs: any[];
  need;
  nearMe = true;
  needId;
  giveNeed: any;
  users;
  mode = 'Observable';
  charities;
  charityJSON;
  counter = 0;
  coords;



  constructor(
    private dataService: DataService,
    private charityService: CharityService
  ) { }

  ngOnInit() {
    this.getNeeds();
    this.getUser();
    this.showPosition();
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
    this.dataService.getNeed("user/followedcharities", this.userId)

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

  
  findLocalCharities(distanceForm: NgForm) { //function to pull the charity list.
    // let distanceNumber = parseInt(distance)
    if (this.nearMe) {
      //requires url with endpoint/distance and payload with lat and long      
      let latAndLong= this.model.latitude+this.model.longitude
      console.log(JSON.stringify(latAndLong), parseInt(this.model.distance))
      this.dataService.postRecord("distancecurrent", parseInt(this.model.distance), this.model)
        .subscribe(
        charities => {
          this.charities = charities;
        },
        error => this.errorMessage = <any>error);
    }
    else if (!this.nearMe) {


    this.dataService.postRecord("distance", this.userId, parseInt(this.model.distance))

      .subscribe(
      charities => {
        this.charities = charities;
      },
      error => this.errorMessage = <any>error);
  }
  }




  followCharity(charityId) { //function for a user to follow a selected charity.
    this.dataService.postRecord("user/followcharity", this.userId, JSON.stringify(charityId))

      .subscribe(
      charity => {
        this.successMessage = "Need added successfully";
        this.getUser();
      },
      error => this.errorMessage = <any>error);
    this.need = '';
  }

  unfollowCharity(charityId) { //function for a user to unfollow a selected charity.

    this.dataService.postRecord("user/unfollowcharity", this.userId, JSON.stringify(charityId))

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
    let payload= '{"userid":'+'"'+ this.userId +'" , "reduceBy":"'+ decrement+'"}'
    this.dataService.postRecord("needreduce", needId, payload)

      .subscribe( 
      need => {
        this.successMessage = "Need added successfully";
        this.getNeeds();
        this.closeModal();
      },
      error => this.errorMessage = <any>error);
    this.need = '';
  }

  decreaseOne() {
    if (this.counter >0){
    this.counter--;
  } 
  }


  increaseOne() {
    
    this.counter++;

  }
  closeModal() {
    this.counter = 0;
  }

  showPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.coords = position.coords;
        localStorage.setItem('lat', this.coords.latitude);
        localStorage.setItem('long', this.coords.longitude);
      });
    } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  }



}
