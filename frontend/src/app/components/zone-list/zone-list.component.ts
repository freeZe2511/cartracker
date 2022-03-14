import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {ZoneService} from "../../shared/services/zone/zone.service";
import {MapService} from "../../shared/services/map/map.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {interval, Subscription, switchMap} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {DialogComponent} from "../dialog/dialog.component";
import {Zone} from "../../shared/models/zone";
import {AlertService} from "../../shared/services/alert/alert.service";

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public zoneService: ZoneService,
              public mapService: MapService,
              public router: Router,
              public dialog: MatDialog,
              private alertService: AlertService) {
  }

  private timeInterval!: Subscription;
  public hide = true;

  /**
   * List of displayed columns from MatTable
   */
  displayedColumns: string[] = ['id', 'name', 'type', 'complexity', 'radius', 'actions']; // TODO created
  dataSource = new MatTableDataSource(this.mapService.zones);

  /**
   * Init zone list and call update loop
   */
  ngOnInit(): void {
    // this.mapService.initZones();
    this.updateZones();
  }

  /**
   * Unsubscribe from update loop after destruction
   */
  ngOnDestroy() {
    this.timeInterval.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Updating subscription loop to get updated data for Table
   */
  private updateZones() {
    this.timeInterval = interval(1000).pipe(
      switchMap(() => this.mapService.getZones()),
    ).subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
        this.mapService.zones = res;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  /**
   * Opens dialog to select new zone type and navigates to map for creation
   */
  add() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        mode: 'Zone',
        action: 'Create',
        extras: [],
        result: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result != undefined) {
        this.router.navigate(['map']).then(() => {
          setTimeout(() => {
            if (result[0] == "circle") this.mapService.addCircleZone = true;
            if (result[0] == "poly") this.mapService.addPolyZone = true;
          }, 100)
        });
      } else {
        this.alertService.onCancel("Add cancelled")
      }
    });
  }

  /**
   * Centers zone on map to follow
   * @param zone
   */
  centerOnZone(zone: Zone) {
    this.router.navigate(['map']).then(() => {
      // needed so map can first load
      setTimeout(() => {
        this.mapService.showZoneMap(zone, true);
      }, 50)
    });
  }

  /**
   * Opens dialog to edit zone data and calls zoneService to edit zone
   * @param zone
   */
  edit(zone: Zone) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        mode: 'Zone',
        action: 'Update',
        extras: [zone],
        result: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.zoneService.updateZone({
          id: zone.id,
          name: result[0],
          pos: zone.pos,
          radius: result[1],
        })
      } else {
        this.alertService.onCancel("Edit cancelled")
      }
    });
  }

  /**
   * Opens dialog to delete zone and calls zoneService to delete zone
   * @param zone
   */
  delete(zone: Zone) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        mode: 'Zone',
        action: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.zoneService.deleteZone(zone.id!);
      } else {
        this.alertService.onCancel("Delete cancelled")
      }
    });
  }
}

