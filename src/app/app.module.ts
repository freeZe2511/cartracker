import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatPaginatorModule} from "@angular/material/paginator";
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MapComponent,
    UserListComponent,
    UserComponent,
    SidebarComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        GoogleMapsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatSidenavModule,
        MatPaginatorModule,
        AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
