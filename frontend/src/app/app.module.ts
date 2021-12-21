import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import { AppRoutingModule } from './app-routing.module';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { SidebarZoneComponent } from './sidebar-zone/sidebar-zone.component';
import { SidebarZoneCollapsedComponent } from './sidebar-zone-collapsed/sidebar-zone-collapsed.component';
import { UserInfoWindowComponent } from './user-info-window/user-info-window.component';
import { AddZoneModalComponent } from './add-zone-modal/add-zone-modal.component';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MapComponent,
    UserListComponent,
    SidebarComponent,
    EditUserModalComponent,
    AddUserModalComponent,
    SidebarZoneComponent,
    SidebarZoneCollapsedComponent,
    UserInfoWindowComponent,
    AddZoneModalComponent
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
        MatCheckboxModule,
        MatInputModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
