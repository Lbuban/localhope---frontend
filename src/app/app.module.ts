import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing/routing.module';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule }   from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule }   from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { CharityComponent } from './charity/charity.component';
import { DoGooderComponent } from './do-gooder/do-gooder.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    RegistrationComponent,
    CharityComponent,
    DoGooderComponent,

   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
