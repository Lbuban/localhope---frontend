import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing/routing.module';
import { DataService } from './data.service';
import { CharityService } from './charity.service';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule }   from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule }   from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { CharityComponent } from './charity/charity.component';
import { DoGooderComponent } from './do-gooder/do-gooder.component';
import { ContactUsComponent } from './contact-us/contact-us.component';




@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    RegistrationComponent,
    CharityComponent,
    DoGooderComponent,
    ContactUsComponent,
  

   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    DataTablesModule,
    BootstrapModalModule
  ],
  providers: [
    DataService,
    CharityService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
