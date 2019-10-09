import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExampleComponent } from "./components/example/example.component";
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { SearchListComponent } from './components/search-list/search-list.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "example", component: ExampleComponent },
  { path: "profile", component: ProfileComponent },
  { path: "profile-settings", component: ProfileSettingsComponent },
  { path: "search", component: SearchListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
