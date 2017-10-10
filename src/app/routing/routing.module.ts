import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }   from '../home/home.component';
import { DoGooderComponent}   from '../do-gooder/do-gooder.component';
import { RegistrationComponent }  from  '../registration/registration.component';
import { CharityComponent }  from  '../charity/charity.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'DoGooder',  component: DoGooderComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'Charity', component: CharityComponent}
 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
