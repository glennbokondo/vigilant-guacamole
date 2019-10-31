import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SearchListComponent } from "./components/search-list/search-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./shared/material.module";

import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginComponent } from "./components/login/login.component";
import { FormsModule } from "@angular/forms";
import { AuthService } from './services/auth.service';
import { ContactComponent } from './components/contact/contact.component';
import { SkillSelectComponent } from './components/skill-select/skill-select.component';
import { EasterEggComponent } from './components/easter-egg/easter-egg.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    ProfileComponent,
    SearchListComponent,
    LoginComponent,
    ContactComponent,
    SkillSelectComponent,
    EasterEggComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "guacattack"),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule, AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB-0lYi8tjgjCv-Di8dM0S2glcOyLASeZU'
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
