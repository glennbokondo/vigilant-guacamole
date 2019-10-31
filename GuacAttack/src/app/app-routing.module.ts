import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchListComponent } from './components/search-list/search-list.component';
// import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { EasterEggComponent } from './components/easter-egg/easter-egg.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "profile/:id", component: ProfileComponent },
  { path: "profile", component: ProfileComponent },
  { path: "search", component: SearchListComponent },
  { path: "contact", component: ContactComponent },
  { path: "secret", component: EasterEggComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
