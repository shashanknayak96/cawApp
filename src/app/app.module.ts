import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CawMaker } from './cawMaker/cawMaker.component';
import { CawComponent } from './caws/caw/caw.component';
import { CawsComponent } from './caws/caws.component';
import { HomePage } from './homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileCardComponent } from './profilecard/profilecard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomePage,
    ProfileCardComponent,
    CawMaker,
    CawsComponent,
    CawComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
