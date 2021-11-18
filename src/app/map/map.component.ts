import { Component, OnInit } from '@angular/core';
import {MapService} from "../services/map.service";
import {User} from "../models/user";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.createMarkers();
  }

  markers = [
    {
      position: { lat: 38.9987208, lng: -77.2538699 },
      title: "test"
    },
    {
      position: { lat: 50.58, lng: 8.67 },
    },
  ]

  mapOptions: google.maps.MapOptions = {
    center: new google.maps.LatLng(50.58727, 8.67554),
    zoom : 14,
    streetViewControl: false,
    fullscreenControl: false

  }

  createMarkers(): void {
    // let users = await this.mapService.getUserPositions();
    let users = this.mapService.getUserPositions();
    console.log(users)
    for (const user of users) {
      this.markers.push({
        position: {lat: 50, lng: 10},
        title: user.username
      })
    }


  }



  // m: google.maps.Marker = new google.maps.Marker({
  //   position: new google.maps.LatLng(50, 8),
  //   title: "m"
  // })


}
