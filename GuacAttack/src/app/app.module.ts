import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ExampleComponent } from "./components/example/example.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SearchListComponent } from "./components/search-list/search-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./shared/material.module";
import { ProfileSettingsComponent } from "./components/profile-settings/profile-settings.component";

import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule } from "@angular/forms";
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    ToolbarComponent,
    HomeComponent,
    ProfileComponent,
    SearchListComponent,
    ProfileSettingsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "guacattack"),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
