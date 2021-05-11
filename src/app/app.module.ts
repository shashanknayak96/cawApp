import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CawMaker } from './cawsComponent/cawMaker/cawMaker.component';
import { CawComponent } from './cawsComponent/caws/caw/caw.component';
import { CawsComponent } from './cawsComponent/caws/caws.component';
import { HomePage } from './homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileCardComponent } from './profilecard/profilecard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { UserFinder } from './userFinder/userFinder.component';
import { UserFinderItem } from './userFinder/userFinderItem/userFinderItem.component';

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
    ProfileComponent,
    UserFinder,
    UserFinderItem
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRouting,
    FontAwesomeModule,
    HttpClientModule,
    PickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
