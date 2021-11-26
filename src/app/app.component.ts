import { Component } from '@angular/core';
import {NavigationService} from "./services/navigation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cartracker-frontend';

  constructor(public _navigation: NavigationService) {
  }
}
