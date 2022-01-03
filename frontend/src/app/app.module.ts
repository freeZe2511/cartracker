import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HeaderComponent} from './components/header/header.component';
import {MapComponent} from './components/map/map.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GoogleMapsModule} from '@angular/google-maps';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {AppRoutingModule} from './app-routing.module';
import {EditUserModalComponent} from './components/edit-user-modal/edit-user-modal.component';
import {AddUserModalComponent} from './components/add-user-modal/add-user-modal.component';
import {SidebarZoneComponent} from './components/sidebar-zone/sidebar-zone.component';
import {SidebarZoneCollapsedComponent} from './components/sidebar-zone-collapsed/sidebar-zone-collapsed.component';
import {UserInfoWindowComponent} from './components/user-info-window/user-info-window.component';
import {AddZoneModalComponent} from './components/add-zone-modal/add-zone-modal.component';
import {MatSelectModule} from "@angular/material/select";
import {ZoneListComponent} from './components/zone-list/zone-list.component';

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
    AddZoneModalComponent,
    ZoneListComponent
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
export class AppModule {
}
