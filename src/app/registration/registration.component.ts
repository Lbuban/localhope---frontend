import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: NgForm;
  
  isCharity;
  userCheck;
    @ViewChild('registrationForm') currentForm: NgForm;

  constructor() { }

  ngOnInit() {
  }
onChange(){
  
  
  event.preventDefault()
  if (this.isCharity=="User") 
    {
     this.userCheck=true}
  else if (this.isCharity=="Charity")  
     {this.userCheck=false};
  }
}

