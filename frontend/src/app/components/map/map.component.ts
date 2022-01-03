import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MapService} from "../../shared/services/map.service";
import {User} from "../../shared/models/user";
import {interval, Subscription, switchMap} from "rxjs";
import {GoogleMap, MapInfoWindow} from "@angular/google-maps";
import {SidebarService} from "../../shared/services/sidebar.service";
import {PosClass, ZoneClass, Zone} from "../../shared/models/zone";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddZoneModalComponent} from "../add-zone-modal/add-zone-modal.component";
import * as turf from '@turf/turf';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @ViewChild(GoogleMap, {static: true}) map!: GoogleMap
  @ViewChild(MapInfoWindow, {static: false}) info!: MapInfoWindow

  public mapOptions: google.maps.MapOptions;
  public polylineOptions: google.maps.PolylineOptions;
  public center!: google.maps.LatLngLiteral;
  public users: User[] = [];
  public timeInterval!: Subscription;
  public newZone: Zone | undefined;
  public drawnZone: google.maps.Circle | google.maps.Polygon | undefined;

  constructor(public _map: MapService, public _sidebar: SidebarService, private _modal: NgbModal) {
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

  ngOnDestroy(): void {
    // this._map.getUserPositions().unsubscribe(); //TODO ??
    }

  ngOnInit(): void {
    this.setSidenavTogglerButton();

    this.initMap();
    this._map.getZones();

    this.updateMapEverySecond();
  }

  private initMap() {
    this._map.markers.clear();
    this._map.getUserPositions().subscribe({
      next: (res: any) => {
        this.users = res;
        for (let user of res) {
          this.addNewMarker(user);
        }

        this.panToMarker();

        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.createAddZoneActivateButton());
      },
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  private async openAddZoneModal() {
    const modalReference = this._modal.open(AddZoneModalComponent);
    modalReference.componentInstance.zone = this.newZone;

    try {
      this.newZone = await modalReference.result;
      this.newZone!.radius *= 1000.0;
      Math.round(this.newZone!.radius);
      this._map.createZone(this.newZone!);
      this._map.getZones();
      console.log(this._map.zones)
    } catch (error) {
      console.log(error);
    }
  }

  public addZoneActivate() {
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].clear();
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.createAddZoneDeactivateButton());
    this.map.googleMap?.addListener("click", (e: any) => {
      this.newZone = new ZoneClass("", [new PosClass(e.latLng.lat(), e.latLng.lng())], 0);
      this.openAddZoneModal().then(() => {
        this.addZoneDeactivate();
      });
    });
  }

  public addZoneDeactivate() {
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].clear();
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.createAddZoneActivateButton());
    google.maps.event.clearListeners(this.map.googleMap!, "click");
  }

  public drawZone(event: {zone: Zone}) {
    if (this.drawnZone) {
      this.drawnZone.setMap(null);
    }
    if (event.zone) {
      if (event.zone.radius != 0) {
        this.panToCircleZone(event.zone);
        this.drawnZone = this.drawCircle(event.zone);
      } else {
        this.panToPolygonZone(event.zone)
        this.drawnZone = this.drawPolygon(event.zone);
      }
    }
  }

  private drawCircle(zone: any): google.maps.Circle {
    return new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "rgba(255,138,138)",
      fillOpacity: 0.2,
      map: this.map.googleMap,
      center: new google.maps.LatLng(zone.pos[0].lat, zone.pos[0].lng),
      radius: zone.radius
    });
  }

  private drawPolygon(zone: any): google.maps.Polygon {
    let polygonCoords = [];
    for (const pos of zone.pos) {
      polygonCoords.push(pos)
    }
    return new google.maps.Polygon({
      paths: polygonCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "rgba(255,138,138)",
      fillOpacity: 0.2,
      map: this.map.googleMap,
    });
  }

  private panToCircleZone(zone: Zone) {
    this.map.panTo(new google.maps.LatLng(zone.pos[0].lat, zone.pos[0].lng));
  }

  private panToPolygonZone(zone: Zone) {
    let outer: turf.helpers.Position[] = [];
    zone.pos.forEach((e: { lat: any; lng: any; }) => {
      let inner = [];
      inner.push(e.lat);
      inner.push(e.lng);
      outer.push(inner);
    })
    outer.push(outer[0]);
    let polygon = turf.polygon([outer]);
    let centroid = turf.centerOfMass(polygon);
    this.map.panTo(new google.maps.LatLng(centroid.geometry.coordinates[0], centroid.geometry.coordinates[1]));
  }

  private updateMapEverySecond() {
    this.timeInterval = interval(1000).pipe(
      switchMap(() => this._map.getUserPositions()),
    ).subscribe({
      next: (res: any) => {
        this._map.getRoutePositions();
        this.drawRoute();

        this.users = res;
        for (let user of res) {
          if (this._map.markers.has(user.id)) {
            if (this.isNewMarker(user)) {
              this.editMarker(user);
            }
          } else {
            this.addNewMarker(user);
          }
        }
        this.panToMarker();

        // this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById("toggleSidebar"));
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  private panToMarker() {
    let userid: string | undefined = this._map.centeredMarkerUserid;
    if (userid) {
      this.map.panTo(this._map.markers.get(userid)!.getPosition()!)
      if (!this._map.keepMarkerCentered) {
        this._map.centeredMarkerUserid = undefined;
      }
    }
  }

  public setCenteredMarker(event: {userid: string}) {
    this._map.setUserClicked(event.userid);
    this.panToMarker();
  }

  public removeCenteredMarker(event: {userid: string}) {
    this._map.unsetUserClicked(event.userid);
    this._map.keepMarkerCentered = false;
  }

  private drawRoute() {
    if (this._map.route) {
      if (this._map.route.positions) {
        let pathArray: google.maps.LatLng[] = [];
        for (let pos of this._map.route?.positions) {
          pathArray.push(new google.maps.LatLng(pos.lat, pos.lng));
        }
        this.polylineOptions.path = pathArray;
      } else {
        this.polylineOptions.path = [];
      }
    } else {
      this.polylineOptions.path = [];
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

      // console.log(user.latestPositions[0].inZone)

      oldMarker = this._map.markers.get(user.id);
      let newMarker: google.maps.Marker = new google.maps.Marker({
        position: newPos,
        title: user.username,
        label: {
          color: "black",
          text: user.username
        }
        //icon: "../../assets/markers/marker_red_dot.png"
      });
      newMarker.setIcon(user.latestPositions[0].inZone ? "../../assets/markers/marker_red_dot.png" : "../../assets/markers/marker_red.png");
      this._map.markers.set(user.id, newMarker);
      if (oldMarker) oldMarker.setMap(null);
      newMarker.setMap(this.map.googleMap!);
      newMarker.addListener('click', () => this._map.setUserClicked(user.id))
      //TODO: add click Event Listener
    }
  }

  private editMarker(user: User) {
    if (user.latestPositions != undefined && user.latestPositions[0] != undefined) {
      let newPos = {lat: user.latestPositions[0].lat, lng: user.latestPositions[0].lng};
      this._map.markers.get(user.id)!.setPosition(newPos);
      this._map.markers.get(user.id)!.setIcon(user.latestPositions[0].inZone ? "../../assets/markers/marker_red_dot.png" : "../../assets/markers/marker_red.png");
    }
  }

  private setSidenavTogglerButton() {
    let sidenav = document.getElementById('sidebar');

    if (sidenav) {
      sidenav.addEventListener('click', (e) => {
        if (sidenav) {
          if (e.offsetX > sidenav.offsetWidth) {
            this._sidebar.toggleSidebar();
          }
        }
      });
    }

    let map = document.getElementById('map');

    if (map) {
      map.addEventListener('click', (e) => {
        if (map) {
          if (e.offsetX < 30 && e.offsetY > (map.offsetHeight / 2 - 21) && e.offsetY < (map.offsetHeight / 2 + 21)) {
            this._sidebar.toggleSidebar();
          }
        }
      });
    }
  }

  private static htmlToElement(html: string): HTMLElement {
    let template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild as HTMLElement;
  }

  private createAddZoneActivateButton(): HTMLElement {
    let addZoneActivateButtonHTML: string = `
        <a id=\"addZoneActivate\" class=\"btn btn-light action-button mr-4\"
        role=\"button\">Activate Zone Add Mode</a>`;
    let addZoneActivateButton = MapComponent.htmlToElement(addZoneActivateButtonHTML);
    addZoneActivateButton.addEventListener("click", () => this.addZoneActivate());
    return addZoneActivateButton;
  }

  private createAddZoneDeactivateButton(): HTMLElement {
    let addZoneDeactivateButtonHTML: string = `
        <a id=\"addZoneDeactivate\" class=\"btn btn-light action-button mr-4\"
        role=\"button\">Deactivate Zone Add Mode</a>`;
    let addZoneDeactivateButton = MapComponent.htmlToElement(addZoneDeactivateButtonHTML);
    addZoneDeactivateButton.addEventListener("click", () => this.addZoneDeactivate());
    return addZoneDeactivateButton;
  }

  private createToggleSidebarButton(): HTMLElement {
    let toggleSidebarButtonHTML: string = `
        <a id=\"toggleSidebar\" class=\"btn btn-light action-button mr-4\"
        role=\"button\">Toggle Sidebar</a>`;
    let toggleSidebarButton = MapComponent.htmlToElement(toggleSidebarButtonHTML);
    toggleSidebarButton.addEventListener("click", () => this._sidebar.toggleSidebar());
    return toggleSidebarButton;
  }
}
