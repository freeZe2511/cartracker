import {Component, OnInit, ViewChild} from '@angular/core';
import {MapService} from "../services/map.service";
import {User} from "../models/user";
import {interval, map, startWith, Subscription, switchMap} from "rxjs";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild(GoogleMap, {static: false}) map!: GoogleMap
  @ViewChild(MapInfoWindow, {static: false}) info!: MapInfoWindow

  constructor(private mapService: MapService) {
  }

  users: User[] = [];
  timeInterval!: Subscription;

  markers: any[] = [];
  infoContent = "";
  center!: google.maps.LatLngLiteral;

  ngOnInit(): void {
    // this.createMarkers().then()
    // this.mapService.getUserPositions2().subscribe( (res: User[]) => {
    //   this.users = res;
    //   this.users.forEach(u => console.log(u.latestPositions[0]))
    // });


    // this.timeInterval = interval(5000).pipe(
    //   startWith(0), switchMap(() => this.mapService.getUserPositions2())
    // ).subscribe( (res: User[]) => {
    //   this.users = res;
    //   this.users.forEach(u => console.log(u.latestPositions[0]))
    // });

    this.timeInterval = interval(1000).pipe(
      switchMap(() => this.mapService.getUserPositions()),
    ).subscribe({
      next: (res: any) => {
        // for (const re of res) {
        //   this.addMarker(re);
        // }
        this.users = res;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });


  }


  mapOptions: google.maps.MapOptions = {
    center: new google.maps.LatLng(50.58727, 8.67554),
    zoom: 2,
    streetViewControl: false,
    fullscreenControl: false,
    // maxZoom: 15,
    // minZoom: 6

  }

  markerOptions: google.maps.MarkerOptions = {
    opacity: 0.8,
  }

  polylineOptions: google.maps.PolylineOptions = {
    path: []
  }

  addMarker(re: User) {
    if(re.latestPositions != undefined) {
      this.markers.push({
        position: {
          lat: re.latestPositions[0].lat + 5,
          lng: re.latestPositions[0].lng,
        },
        label: {
          color: "red",
          text: re.username,
        },
        title: 'Marker title ' + (this.markers.length + 1),
        info: 'Marker info ' + (this.markers.length + 1),
        options: {
          // animation: google.maps.Animation.BOUNCE,
        },
      })
    }
  }

  openInfo(marker: MapMarker, content: any) {
    this.infoContent = content
    this.info.open(marker)
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }


  // m: google.maps.Marker = new google.maps.Marker({
  //   position: new google.maps.LatLng(50, 8),
  //   title: "m"
  // })


}
