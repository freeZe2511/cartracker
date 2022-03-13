import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MapComponent} from './components/map/map.component';
import {AppRoutingModule} from './app-routing.module';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {LoginComponent} from './components/login/login.component';
import {AngularMaterialModule} from './angular-material.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { HelpComponent } from './components/help/help.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { DialogComponent } from './components/dialog/dialog.component';
import {SimpleNotificationsModule} from "angular2-notifications";
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent,
    ToolbarComponent,
    UserListComponent,
    ZoneListComponent,
    StatisticsComponent,
    HelpComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    LeafletModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatSlideToggleModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
