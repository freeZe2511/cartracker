import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {interval, Subscription, switchMap} from "rxjs";
import {UserService} from "../../shared/services/users.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MapService} from "../../shared/services/map.service";
import {Router} from "@angular/router";
import {Zone} from "../../shared/models/zone";

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  timeInterval!: Subscription;

  constructor(private _user: UserService, private modalService: NgbModal, private mapService: MapService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.mapService.getZones();
    this.initZones();

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private initZones() {
    this.dataSource.data = this.mapService.zones; // TODO all / none zone
  }

  public centerOnZone(zone: Zone) {
    if (zone.radius == 0) {
      // panToPolygonZone() TODO in mapService
    } else {
      // panToCircleZone()
    }
    this.router.navigate(['map']);
  }

  public async add() {
    this.router.navigate(['map']);
  }

  public async edit(zone: Zone) {
    // TODO in map?
    // const modalReference = this.modalService.open(EditUserModalComponent);
    // modalReference.componentInstance.zone = zone;
    //
    // try {
    //   const resultZone: Zone = await modalReference.result;
    //   this.mapService.updateZone(resultZone); // TODO zone service?
    // } catch (error) {
    //   console.log(error);
    // }
  }

  public async delete(zoneid: string) {
    // this.mapService.deleteZone(zoneid); // TODO
  }

  displayedColumns: string[] = ['id', 'name', 'type', 'complexity', 'radius', 'actions']; // TODO created
  dataSource = new MatTableDataSource(this.mapService.zones);

  public convertTime(id: any) {
    let timeStamp = parseInt(id.substr(0, 8), 16) * 1000
    return new Date(timeStamp)  // TODO refactor into nice format
  }

}

