import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExampleComponent } from "./components/example/example.component";
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { LoginComponent } from './components/login/login.component';
import { NewProfileComponent } from './components/new-profile/new-profile.component';
import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: "login", component: UserProfileComponent },
  { path: "example", component: ExampleComponent },
  { path: "profile/:id", component: ProfileComponent },
  { path: "profile", component: ProfileComponent },
  { path: "profile/new/:id", component: NewProfileComponent },
  { path: "profile-settings/:id", component: ProfileSettingsComponent },
  { path: "profile-settings", component: ProfileSettingsComponent},
  { path: "search", component: SearchListComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
