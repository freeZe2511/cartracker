import { Component, OnInit } from '@angular/core';
import {MapService} from "../services/map.service";
import {User} from "../models/user";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService) {}

  users: User[] = [];

  ngOnInit(): void {
    // this.createMarkers().then()
    this.mapService.getUserPositions2().subscribe( (res: User[]) => {
      this.users = res;
      this.users.forEach(u => console.log(u.latestPositions[0]))
    });
  }



  mapOptions: google.maps.MapOptions = {
    center: new google.maps.LatLng(50.58727, 8.67554),
    zoom : 2,
    streetViewControl: false,
    fullscreenControl: false

  }

  markerOptions: google.maps.MarkerOptions = {
    opacity: 0.8
  }

  // markers = [
  //   {
  //     position: { lat: 38.9987208, lng: -77.2538699 },
  //     title: "test"
  //   },
  // ]
  //
  // async createMarkers(): Promise<void> {
  //   let users = await this.mapService.getUserPositions();
  //   for (const user of users) {
  //     if(user.latestPositions[0] != undefined){
  //       this.markers.push({
  //         position: {lat: user.latestPositions[0].lat, lng: user.latestPositions[0].lng},
  //         title: user.username
  //       })
  //     }
  //   }
  // }



  // m: google.maps.Marker = new google.maps.Marker({
  //   position: new google.maps.LatLng(50, 8),
  //   title: "m"
  // })


}
