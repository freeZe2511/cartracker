import {Component, OnInit, ViewChild} from '@angular/core';
import {MapService} from "../services/map.service";
import {User} from "../models/user";
import {interval, Subscription, switchMap} from "rxjs";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import Animation = google.maps.Animation;
import {SidebarService} from "../services/sidebar.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild(GoogleMap, {static: false}) map!: GoogleMap
  @ViewChild(MapInfoWindow, {static: false}) info!: MapInfoWindow

  constructor(public _map: MapService, public _sidebar: SidebarService) { }

  public users: User[] = [];
  public timeInterval!: Subscription;

  public infoContent = "";
  public center!: google.maps.LatLngLiteral;

  ngOnInit(): void {
    this.timeInterval = interval(1000).pipe(
      switchMap(() => this._map.getUserPositions()),
    ).subscribe({
      next: (res: any) => {
        this.users = res;
        for (let user of res) {
          if(this._map.markers.has(user.id)) {
            if (this.isNewMarker(user)) {
              this.addNewMarker(user);
            }
          } else {
            this.addNewMarker(user);
          }
        }

        this.centerOnMarker();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });

  }

  private centerOnMarker() {
    if (this._map.centeredMarkerPos) {
      this.map.googleMap?.setCenter(this._map.centeredMarkerPos);
      if (!this._map.keepCentered) {
        this._map.centeredMarkerPos = undefined;
      }
    }
  }

  private isNewMarker(user: User): boolean {
    let pos = this._map.markers.get(user.id)!.getPosition();
    return user.latestPositions![0].lat != pos?.lat() || user.latestPositions![0].lng != pos?.lng();
  }

  private addNewMarker(user: User) {
    if (user.latestPositions != undefined && user.latestPositions[0] != undefined) {
      let oldMarker: google.maps.Marker | undefined;
      let newPos = {lat: user.latestPositions[0].lat, lng: user.latestPositions[0].lng}
      oldMarker = this._map.markers.get(user.id);
      this._map.markers.set(user.id, new google.maps.Marker({
        position: newPos,
        title: user.username,
        label: {
          color: "black",
          text: user.username
        }
      }));
      if (oldMarker) oldMarker.setMap(null);
      this._map.markers.get(user.id)!.setMap(this.map.googleMap!);
      //TODO: add click Event Listener
    }
  }

  mapOptions: google.maps.MapOptions = {
    center: new google.maps.LatLng(50.58727, 8.67554),
    zoom: 9,
    streetViewControl: false,
    fullscreenControl: false,
    // maxZoom: 15,
    // minZoom: 6
  }

  markerOptions: google.maps.MarkerOptions = {
    opacity: 0.8,
  }

  //TODO: routes
  polylineOptions: google.maps.PolylineOptions = {
    path: []
  }

}
