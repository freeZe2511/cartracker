import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from "./components/map/map.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {ZoneListComponent} from "./components/zone-list/zone-list.component";

const routes: Routes = [
  // { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  // { path: 'sign-in', component: LoginComponent},
  {path: 'home', redirectTo: '/map'},
  {path: 'map', component: MapComponent},
  {path: 'users', component: UserListComponent},
  {path: 'zones', component: ZoneListComponent},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
