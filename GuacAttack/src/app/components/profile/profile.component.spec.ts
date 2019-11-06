import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProfileComponent } from "./profile.component";
import { MaterialModule } from "src/app/shared/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppModule } from "src/app/app.module";
import { DebugElement } from "@angular/core";
import { SkillSelectComponent } from "../skill-select/skill-select.component";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { RouterTestingModule } from '@angular/router/testing';

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let de: DebugElement;
  let stub: any;


  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(
          environment.firebaseConfig,
          "guacattack"
        ),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        AngularFirestoreModule
      ],
      declarations: [ProfileComponent, SkillSelectComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
