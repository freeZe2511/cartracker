import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MapComponent} from "./components/map/map.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {UserListComponent} from "./components/user-list/user-list.component";
import {ZoneListComponent} from "./components/zone-list/zone-list.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";
import {HelpComponent} from "./components/help/help.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  // {path: '**', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'help', component: HelpComponent},
  {path: 'map', component: MapComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'zones', component: ZoneListComponent, canActivate: [AuthGuard]},
  {path: 'stats', component: StatisticsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
