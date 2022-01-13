import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from "./components/map/map.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {ZoneListComponent} from "./components/zone-list/zone-list.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {ImprintComponent} from "./components/imprint/imprint.component";

const routes: Routes = [
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: LoginComponent},
  {path: 'home', redirectTo: '/map'},
  {path: 'imprint', component: ImprintComponent},
  {path: 'map', component: MapComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'zones', component: ZoneListComponent, canActivate: [AuthGuard]},
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
