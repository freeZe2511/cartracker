import {Component, OnInit, ViewChild} from '@angular/core';
import {MapService} from "../services/map.service";
import {User} from "../models/user";
import {interval, Subscription, switchMap} from "rxjs";
import {GoogleMap, MapInfoWindow} from "@angular/google-maps";
import {SidebarService} from "../services/sidebar.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild(GoogleMap, {static: true}) map!: GoogleMap
  @ViewChild(MapInfoWindow, {static: false}) info!: MapInfoWindow

  public mapOptions: google.maps.MapOptions;
  public polylineOptions: google.maps.PolylineOptions;
  public center!: google.maps.LatLngLiteral;
  public users: User[] = [];
  public timeInterval!: Subscription;

  constructor(public _map: MapService, public _sidebar: SidebarService) {
    this.mapOptions = {
      center: new google.maps.LatLng(50.58727, 8.67554),
      zoom: 9,
      streetViewControl: false,
      fullscreenControl: false,
      // maxZoom: 15,
      // minZoom: 6
    }

    this.polylineOptions = {
      path: [],
      strokeColor: '#3b3bf6',
      strokeWeight: 4
    }
  }

  ngOnInit(): void {
    this.timeInterval = interval(100).pipe(
      switchMap(() => this._map.getUserPositions()),
    ).subscribe({
      next: (res: any) => {
        this.users = res;
        for (let user of res) {
          if(this._map.markers.has(user.id)) {
            if (this.isNewMarker(user)) {
              this.editMarker(user);
            }
          } else {
            this.addNewMarker(user);
          }
        }
        this.centerOnMarker();

        this.setRoute();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  private centerOnMarker() {
    let userid: string | undefined = this._map.centeredMarkerUserid;
    if (userid) {
      this.map.panTo(this._map.markers.get(userid)!.getPosition()!)
      if(!this._map.keepCentered) {
        this._map.centeredMarkerUserid = undefined;
      }
    }
  }

  private setRoute() {
    if(this._map.route) {
      if(this._map.route.positions) {
        let pathArray: google.maps.LatLng[] = [];
        for (let pos of this._map.route?.positions) {
          pathArray.push(new google.maps.LatLng(pos.lat, pos.lng));
        }
        this.polylineOptions.path = pathArray;
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
      let newPos = {lat: user.latestPositions[0].lat, lng: user.latestPositions[0].lng};
      oldMarker = this._map.markers.get(user.id);
      this._map.markers.set(user.id, new google.maps.Marker({
        position: newPos,
        title: user.username,
        label: {
          color: "black",
          text: user.username
        }
        //icon: "../../assets/markers/marker_red_dot.png"
      }));
      if (oldMarker) oldMarker.setMap(null);
      this._map.markers.get(user.id)!.setMap(this.map.googleMap!);
      //TODO: add click Event Listener
    }
  }

  private editMarker(user: User) {
    if (user.latestPositions != undefined && user.latestPositions[0] != undefined) {
      let newPos = {lat: user.latestPositions[0].lat, lng: user.latestPositions[0].lng};
      this._map.markers.get(user.id)!.setPosition(newPos);
    }
  }
}
