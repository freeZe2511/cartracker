import {Injectable} from '@angular/core';
import * as L from 'leaflet';
import {LatLngTuple} from 'leaflet';
import {environment} from "../../../../environments/environment";
import {HttpService} from "../http/http.service";
import {AuthService} from "../auth/auth.service";
import {interval, Subscription, switchMap} from "rxjs";
import {User} from "../../models/user";
import {Pos, Zone} from "../../models/zone";
import centerOfMass from "@turf/center-of-mass";
import * as helpers from "@turf/helpers"
import {AlertService} from "../alert/alert.service";
import {ZoneService} from "../zone/zone.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public timeInterval!: Subscription;
  public markers: Map<string, L.CircleMarker> = new Map();
  public zonesMap: Map<string, any> = new Map();
  public routesMap: Map<string, L.Polyline | undefined> = new Map();
  public users: User[] = [];
  public usersInZones: Map<string, any> = new Map();
  public usersIsMoving: Map<string, any> = new Map();
  public zones: Zone[] = [];
  public map!: L.Map;

  public route: any[] = [];

  follows: Map<string, boolean> = new Map();
  showZoneUser: Map<string, boolean> = new Map();
  showRoute: Map<string, boolean> = new Map();
  showZone: Map<string, boolean> = new Map();
  centers: Map<string, boolean> = new Map();

  routeHour = 0;
  routeMin = 0;
  expanded = -1;

  addCircleZoneName: string | undefined;
  addCircleZone = false;
  addCircleZoneCenter: L.Circle | undefined;
  addCircleZoneCenterValue: any;
  addCircleZoneCircle: L.Circle | undefined;
  addCircleZoneRadius: number | undefined;
  addPolyZone = false;
  addPolyZonePoints: L.Circle[] = [];
  addPolyZoneLine!: L.Polyline;
  addPolyZoneFirstPoint!: L.Circle;
  addPolyZoneName: string | undefined;

  showDetails = true;
  notifications = true;
  showZonesBool = false;

  constructor(private httpService: HttpService, private authService: AuthService, private alertService: AlertService, public zoneService: ZoneService, public router: Router) {
  }

  // ### INIT ### //

  initZones() {
    this.getZones().subscribe({
      next: (res: any) => {
        for (const zone of res) {
          this.zones.push(zone);
        }
      },
      error: (e: any) => console.error(e),
      // complete: () => console.info('complete loading zones')
    });
  }

  initUserPositions() {
    this.getUserPositions().subscribe({
      next: (res: any) => {
        for (const user of res) {
          this.users.push(user);
          if (user.latestPositions != undefined && user.latestPositions[0] != undefined) {
            this.usersInZones.set(user.id, user.latestPositions[0].inZone);
            this.addNewMarker(user);
          }

        }
      },
      error: (e: any) => console.error(e),
      // complete: () => console.info('complete loading users')
    });
  }

  initMap(map: L.Map) {
    this.map = map;
    this.markers.clear();
    this.users = [];
    this.zones = [];

    this.map.on('click', (e: L.LeafletMouseEvent) => {

      if (this.addCircleZone) {
        this.addCircleZoneCenter?.removeFrom(this.map);
        this.addCircleZoneCenterValue = e.latlng;
        this.addCircleZoneCenter = L.circle(this.addCircleZoneCenterValue, {
          color: "#ff0000",
          fillOpacity: 1
        }).addTo(this.map);
        if (this.addCircleZoneRadius != undefined) this.addCircleZoneRadiusCircle(this.addCircleZoneRadius);
      }
      if (this.addPolyZone) {
        let point = e.latlng;
        let marker = L.circle(point, {
          color: "#ff0000",
          fillOpacity: 1
        }).addTo(this.map);

        this.addPolyZonePoints.push(marker)

        if (this.addPolyZonePoints.length == 1) {
          this.addPolyZoneFirstPoint = marker;
        }

        if (this.addPolyZonePoints.length == 2) {
          let latlngs = [];
          latlngs.push(this.addPolyZonePoints[0].getLatLng())
          latlngs.push(this.addPolyZonePoints[1].getLatLng())
          this.addPolyZoneLine = L.polyline(latlngs)
        }
        if (this.addPolyZonePoints.length > 2) {
          this.addPolyZoneLine.addLatLng(point).addTo(this.map);
        }
      }
    })

    this.initZones();
    this.initUserPositions();
  }

  addCircleZoneRadiusCircle(event: number) {
    this.addCircleZoneCircle?.removeFrom(this.map);
    if (event != undefined && this.addCircleZoneCenterValue != undefined) {
      this.addCircleZoneRadius = event;
      this.addCircleZoneCircle = L.circle(this.addCircleZoneCenterValue, {
        radius: this.addCircleZoneRadius * 1000,
        color: "#101010"
      }).addTo(this.map);
    }
  }

  // ### UPDATE PIPE ### //

  updateUserMarkers(): void {
    this.timeInterval = interval(1000).pipe(
      switchMap(() => this.getUserPositions()),)
      .subscribe(
        {
          next: (res: any) => {
            this.users = res;
            for (const user of res) {
              if (this.isNewMarker(user)) {
                this.addNewMarker(user);
              } else {
                this.addExistingMarker(user);
              }
            }
            this.centerMarker();
            this.centerZone();
          }
        }
      );
  }

  // ### HTTP CALLS ### //

  getUserPositions(): any {
    return this.httpService.get(environment.backendURL + "api/v1/pos",
      {headers: this.authService.authHeader});
  }

  getZones(): any {
    return this.httpService.get(environment.backendURL + "api/v1/zones",
      {headers: this.authService.authHeader});
  }

  getUserRoute(user: User, hours: number, minutes: number) {
    let data: string = user.id + "&&" + hours.toString() + "&&" + minutes.toString();
    this.httpService.get(environment.backendURL + "api/v1/route/" + data,
      {headers: this.authService.authHeader}).subscribe({
      next: (res: any) => {
        this.route = res;
        let polyline = L.polyline(this.route).addTo(this.map);
        this.routesMap.set(user.id!, polyline);
      },
      error: (e) => {
        if (e["status"] == 404) {
          if(this.notifications) this.alertService.onError("No Positions in time window");
        }
      },
      complete: () => console.info('complete')
    });
  }

  // ### MARKER LOGIC ### //

  addNewMarker(user: User): void {
    if (user.latestPositions != undefined && user.latestPositions[0] != undefined) {
      const pos = user.latestPositions[0];

      let oldMarker: L.CircleMarker | undefined;
      oldMarker = this.markers.get(user.id);
      if (oldMarker) oldMarker.removeFrom(this.map);

      let newMarker = L.circleMarker([pos.lat, pos.lng], {
        radius: 7,
        color: "#434343",
      }).bindTooltip(this.getContent(user), {
        permanent: true,
        direction: 'top',
      }).addTo(this.map);

      this.markers.set(user.id, newMarker);

      newMarker.on("click", () => {
        this.setFollows(user);
        this.centerMarker();
      })

      let lastInZone = this.usersInZones.get(user.id);
      let lastIsMoving = this.usersIsMoving.get(user.id);
      let inZone = pos.inZone;
      let isMoving = pos.isMoving;

      newMarker.setStyle({
        fillColor: inZone ? "#8dff00" : "#ff0000",
        fillOpacity: isMoving ? 1 : 0.25
      })

      if (lastInZone && !inZone && this.notifications) this.alertService.onLeave(user.username + " left " + this.findZone(user.zoneid!)!.name)
      if (!lastInZone && inZone && this.notifications) this.alertService.onEnter(user.username + " entered " + this.findZone(user.zoneid!)!.name);
      if (lastIsMoving && !isMoving && this.notifications) this.alertService.onInfo("Inactive ", user.username + " inactive in " + this.findZone(user.zoneid!)!.name);
      if (!lastIsMoving && isMoving && this.notifications) this.alertService.onInfo("Active", user.username + " active in " + this.findZone(user.zoneid!)!.name);
      this.usersInZones.set(user.id, inZone);
      this.usersIsMoving.set(user.id, isMoving);

      if (this.showRoute.get(user.id) && this.routesMap.get(user.id) != undefined) {
        this.routesMap.get(user.id)!.addLatLng([pos.lat, pos.lng])
      }
    }
  }

  addExistingMarker(user: User): void {
    if (user.latestPositions != undefined && user.latestPositions[0] != undefined) {
      const pos = user.latestPositions[0];

      let inZone = pos.inZone;
      let lastIsMoving = this.usersIsMoving.get(user.id);
      let isMoving = pos.isMoving;

      if (lastIsMoving && !isMoving && this.notifications) this.alertService.onInfo("Inactive", user.username + " inactive in " + this.findZone(user.zoneid!)!.name);
      if (!lastIsMoving && isMoving && this.notifications) this.alertService.onInfo("Active", user.username + " active in " + this.findZone(user.zoneid!)!.name);
      this.usersIsMoving.set(user.id, isMoving);

      this.markers.get(user.id)?.setLatLng([pos.lat, pos.lng]).setStyle({
        fillColor: inZone ? "#8dff00" : "#ff0000",
        fillOpacity: isMoving ? 1 : 0.25
      }).setTooltipContent(this.getContent(user));
    }
  }

  getContent(user: User): string{
    const pos = user.latestPositions![0];
    if(this.showDetails){
      let speed = pos.speed < 0 ? 0 : pos.speed * 3.6
      return "<strong>" + user.username + "</strong>" + "<br>" + pos.lat.toFixed(8) + ', ' + pos.lng.toFixed(8) + "<br>" + speed.toFixed(2) + "km/h";
    } else {
      return "<strong>" + user.username + "</strong>";
    }
  }

  isNewMarker(user: User) {
    if (user.latestPositions != undefined && user.latestPositions[0] != undefined) {
      let pos = this.markers.get(user.id)?.getLatLng();
      return user.latestPositions![0].lat != pos?.lat || user.latestPositions![0].lng != pos?.lng;
    }
    return false;
  }

  // ### RESET DATA ### //

  resetDataMaps(x: string) {
    this.showZonesBool = false;
    this.routeHour = 0;
    this.routeMin = 0;
    this.route = [];
    this.expanded = -1;
    // this.showZonesBool = false;
    this.follows.forEach((v, k, m) => m.set(k, false));
    this.showZoneUser.forEach((v, k, m) => m.set(k, false));
    this.showRoute.forEach((v, k, m) => m.set(k, false));
    this.centers.forEach((v, k, m) => m.set(k, false));
    if (x == "u") {
      this.zonesMap.forEach((v, k, m) => {
        this.map.removeLayer(v);
      });
      this.showZone.forEach((v, k, m) => m.set(k, false));
      this.routesMap.forEach((v, k, m) => {
        if (v != undefined) this.map.removeLayer(v);
        m.set(k, undefined)
      });
    }
  }

  // ### MAP PAN LOGIC ### //

  centerMarker() {
    this.follows.forEach((v, k, m) => {
      if (v) {
        // TODO maybe map
        for (let user of this.users) {
          if (user.id == k) {
            if (user.latestPositions![0] != undefined) {
              this.map.panTo([user.latestPositions![0].lat, user.latestPositions![0].lng]);
            } else {
              if(this.notifications) this.alertService.onError("No User Position");
            }
          }
        }
      }
    });
  }

  centerZone() {
    this.centers.forEach((v, k, m) => {
      if (v) {
        // TODO maybe map
        for (let zone of this.zones) {
          if (zone.id == k) {
            this.map.panTo([zone.pos![0].lat, zone.pos![0].lng])
          }
        }
      }
    });
  }

  centerCircleZone(zone: Zone) {
    this.map.panTo([zone.pos[0].lat, zone.pos[0].lng]);
  }

  centerPolyZone(zone: Zone) {
    let outer: helpers.Position[] = [];
    zone.pos.forEach((e: { lat: any; lng: any; }) => {
      let inner = [];
      inner.push(e.lat);
      inner.push(e.lng);
      outer.push(inner);
    })
    outer.push(outer[0]);
    let polygon = helpers.polygon([outer]);
    let centroid = centerOfMass(polygon);
    this.map.panTo([centroid.geometry.coordinates[0], centroid.geometry.coordinates[1]]);
  }

  setFollows(user: User) {
    this.follows.forEach((v, k, m) => m.set(k, false));
    this.follows.set(user.id, true);

    let i = 0;
    for (let user1 of this.users) {
      if (user.id == user1.id) this.expanded = i;
      i++;
    }
  }

  // ### ROUTE LOGIC ### //

  showUserRoute(user: User, event: boolean) {
    this.showRoute.set(user.id, event);

    if (event) {
      this.getUserRoute(user, this.routeHour, this.routeMin);
    } else {
      this.route = [];
      if (this.routesMap.get(user.id!) != undefined) this.routesMap.get(user.id!)!.removeFrom(this.map);
      this.routesMap.set(user.id, undefined);
    }

  }

  drawUserRoute(user: User, event: boolean) {
    if (event) {
      let polyline = L.polyline(this.route).addTo(this.map);
      this.routesMap.set(user.id!, polyline);
    } else {
      this.routesMap.get(user.id!)!.removeFrom(this.map);
      this.routesMap.set(user.id, undefined);
    }
  }

  // ### ZONE LOGIC ### //

  toggleCircleZone(event: boolean) {
    this.addCircleZone = event;
    this.addPolyZone = false;
    this.addCircleZoneCenter?.removeFrom(this.map);
    this.addCircleZoneCircle?.removeFrom(this.map);
    this.addCircleZoneRadius = undefined;
    this.addCircleZoneCenter = undefined;
    this.addCircleZoneCenterValue = undefined;
    this.addCircleZoneCircle = undefined;
    this.addCircleZoneRadius = undefined;
  }

  togglePolyZone(event: boolean) {
    this.addPolyZone = event;
    this.addCircleZone = false;
    this.addPolyZoneLine?.setLatLngs([]);
    this.addPolyZonePoints.forEach((v, k, m) => {
      v.removeFrom(this.map)
    });
    this.addPolyZonePoints = [];
    this.addPolyZoneLine?.removeFrom(this.map);
    this.addPolyZoneName = undefined;
  }

  showAllZones(event: boolean) {
    if (event) {
      for (let zone of this.zones) {
        if (zone.name != "None") {
          this.showZone.set(zone.id!, true);
          this.drawZone(zone, true);
        }
      }
    } else {
      this.resetDataMaps('u');
    }
  }

  showZoneMap(zone: Zone, event: boolean) {
    if (zone.id != "1") {
      this.showZone.set(zone.id!, event);
      this.drawZone(zone, event);
      if (event && zone.radius != 0) this.centerCircleZone(zone);
      if (event && zone.radius == 0) this.centerPolyZone(zone);
    }
  }

  showUserZone(user: User, event: boolean) {
    this.showZoneUser.set(user.id, event);
    this.drawUserZone(user, event);
  }

  drawUserZone(user: User, event: boolean) {
    let zoneid = user.zoneid;
    for (let zone of this.zones) {
      if (zone.id == zoneid) {
        this.drawZone(zone, event);
        if (event && zone.radius != 0) this.centerCircleZone(zone);
        if (event && zone.radius == 0) this.centerPolyZone(zone);
      }
    }
  }

  drawZone(zone: Zone, event: boolean) {
    if (zone.radius != 0) {
      this.drawCircleZone(zone, event);
    } else {
      this.drawPolyZone(zone, event);
    }
  }

  drawCircleZone(zone: Zone, event: boolean) {
    let center: LatLngTuple = [zone.pos[0].lat, zone.pos[0].lng]
    let options = {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.05
    }
    if (event) {
      let circleZone = L.circle(center, zone.radius, options).addTo(this.map);
      this.zonesMap.set(zone.id!, circleZone);
    } else {
      this.zonesMap.get(zone.id!)!.removeFrom(this.map);
    }
  }

  drawPolyZone(zone: Zone, event: boolean) {
    let options = {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.05
    }

    let polyCoords = [];
    for (const pos of zone.pos) {
      polyCoords.push(pos)
    }

    if (event) {
      let polyZone = L.polygon(polyCoords, options).addTo(this.map);
      this.zonesMap.set(zone.id!, polyZone);

    } else {
      this.zonesMap.get(zone.id!)!.removeFrom(this.map);
    }

  }

  createCircleZone() {
    this.zoneService.createZone({
      name: this.addCircleZoneName!,
      pos: [{lat: this.addCircleZoneCenterValue.lat, lng: this.addCircleZoneCenterValue.lng}],
      radius: this.addCircleZoneRadius! * 1000
    });
    this.router.navigate(['zones'])
  }

  createPolyZone() {
    let pos: Pos[] = [];
    this.addPolyZonePoints.forEach((v) => {
      pos.push({lat: v.getLatLng().lat, lng: v.getLatLng().lng})
    });
    pos.push({lat: this.addPolyZoneFirstPoint.getLatLng().lat, lng: this.addPolyZoneFirstPoint.getLatLng().lng})
    this.zoneService.createZone({
      name: this.addPolyZoneName!,
      pos: pos,
      radius: 0,
    })
    this.router.navigate(['zones'])
  }

  // ### HELPER LOGIC ### //

  convertTimeFromObjID(id: string) {
    let timeStamp = parseInt(id.substr(0, 8), 16) * 1000
    return new Date(timeStamp)  // TODO refactor into nice format
  }

  findZone(zoneid: string) {
    return this.zones.find(z => z.id === zoneid);
  }

  findZoneType(zone: Zone) {
    if (zone.name == "None") {
      return "None";
    } else {
      return zone.radius === 0 ? "Polygon" : "Circle"
    }
  }
}
