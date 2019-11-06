import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./shared/material.module";
import { AppModule } from "./app.module";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestoreModule } from "@angular/fire/firestore";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        AngularFireModule.initializeApp(
          environment.firebaseConfig,
          "guacattack"
        ),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        AngularFirestoreModule
      ],
      declarations: [AppComponent, ToolbarComponent]
    }).compileComponents();
  }));

  it("should create the app", async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Spectrum'`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("Spectrum");
  });
});
