import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapComponent} from "./map/map.component";
import {UserListComponent} from "./user-list/user-list.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  // { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  // { path: 'sign-in', component: LoginComponent},
  { path: 'home', redirectTo: '/map' },
  { path: 'map', component: MapComponent },
  { path: 'users', component: UserListComponent },
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
