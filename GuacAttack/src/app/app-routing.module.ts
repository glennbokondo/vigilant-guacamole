import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExampleComponent } from "./example/example.component";
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { SearchListComponent } from './search-list/search-list.component';

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
