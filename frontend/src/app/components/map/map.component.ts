import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {MapService} from "../../shared/services/map/map.service";
import {User} from "../../shared/models/user";
import {Zone} from "../../shared/models/zone";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  public map!: L.Map;
  public users!: User[];
  public zones!: Zone[];

  constructor(public mapService: MapService) {
  }

  /**
   * Init users, zones, map with MapService
   */
  ngOnInit(): void {
    this.initMap();
    this.mapService.initMap(this.map);
    this.mapService.updateUserMarkers();
    this.users = this.mapService.users;
    this.zones = this.mapService.zones;
  }

  /**
   * Reset Data on component destruction
   */
  ngOnDestroy() {
    this.users = [];
    this.zones = [];
    this.mapService.showZonesBool = false;
    this.mapService.addCircleZone = false;
    this.mapService.addPolyZone = false;
    this.mapService.addCircleZoneRadius = undefined;
    this.mapService.addCircleZoneName = undefined;
    this.mapService.addPolyZonePoints = [];

    this.mapService.addPolyZoneLine?.setLatLngs([]);
    this.mapService.addPolyZonePoints.forEach((v, k, m) => {
      v.removeFrom(this.map)
    });
    this.mapService.addPolyZonePoints = [];
    this.mapService.addPolyZoneLine?.removeFrom(this.map);
    this.mapService.addPolyZoneName = undefined;

    if(this.mapService.timeInterval) {
      this.mapService.timeInterval.unsubscribe();
    }
  }

  /**
   * Init Leaflet Map with OSM as base layer
   */
  public initMap(): void {
    const options = {
      zoom: 10,
      center: L.latLng([50.5, 8.65])
    };

    this.map = L.map('map', options);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

}
