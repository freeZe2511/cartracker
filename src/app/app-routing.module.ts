import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapComponent} from "./map/map.component";
import {UserListComponent} from "./user-list/user-list.component";

const routes: Routes = [
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
