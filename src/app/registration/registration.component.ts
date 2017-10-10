import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: NgForm;
  
  role;
  userCheck;
    @ViewChild('registrationForm') currentForm: NgForm;

  constructor() { }

  ngOnInit() {
  }
onChange(){
  
  console.log(this.role)
  event.preventDefault()
  if (this.role=="User") 
    {
     this.userCheck=true}
  else if (this.role=="Charity")  
     {this.userCheck=false};
  }
}

