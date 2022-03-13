import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../shared/services/user/user.service";
import {User} from "../../shared/models/user";
import {MapService} from "../../shared/services/map/map.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {interval, Subscription, switchMap} from "rxjs";
import {AlertService} from "../../shared/services/alert/alert.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public userService: UserService,
              public mapService: MapService,
              public router: Router,
              public dialog: MatDialog,
              private alertService: AlertService) {
  }

  private timeInterval!: Subscription;
  hide = true;

  displayedColumns: string[] = ['id', 'username', 'password', 'zone', 'status', 'position', 'created', 'actions'];
  dataSource = new MatTableDataSource(this.userService.users);

  ngOnInit(): void {
    // this.mapService.initZones();
    this.initUsers();
    this.updateUsers();
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      this.timeInterval.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initUsers() {
    this.userService.getUsersList().subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
        this.userService.users = res;
      },
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  updateUsers() {
    this.timeInterval = interval(1000).pipe(
      switchMap(() => this.userService.getUsersList()),
    ).subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
        this.userService.users = res;
        // console.log(this.userService.users) TODO
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  returnStatus(user: User) {
    if(user.latestPositions != undefined && user.latestPositions![0] != undefined) {
      return user.latestPositions![0].isMoving ? "Active" : "Inactive"
    } else {
      return "No Pos"
    }
  }

  returnStatusColor(user: User){
    if(user.latestPositions != undefined && user.latestPositions![0] != undefined) {
      return user.latestPositions[0].isMoving ? "#67ce00" : "#ff0000"
    } else {
      return "#ffa347"
    }
  }

  returnPos(user: User) {
    if(user.latestPositions != undefined && user.latestPositions![0] != undefined) {
      let lat = user.latestPositions[0].lat;
      let lng = user.latestPositions[0].lng;
      return lat + ", " + lng
    } else {
      return "No Pos"
    }
  }

  returnZoneColor(user: User){
    if(user.latestPositions != undefined && user.latestPositions![0] != undefined) {
      return user.latestPositions[0].inZone ? "#67ce00" : "#ff0000"
    } else {
      return "#111111"
    }
  }



  add() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        mode: 'User',
        action: 'Create',
        extras: [this.mapService.zones, this.hide],
        result: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //TODO empty form
      if (result != undefined) {
        this.userService.createUser({
          id: "",
          username: result[0],
          password: result[1],
          zoneid: result[2]
        })
      } else {
        this.alertService.onCancel("Add cancelled")
      }
    });
  }

  centerOnUser(user: User) {
    this.router.navigate(['map']).then(() => this.mapService.setFollows(user));
  }

  edit(user: User) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        mode: 'User',
        action: 'Update',
        extras: [this.mapService.zones, this.hide, user],
        result: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.userService.updateUser({
          id: user.id,
          username: result[0],
          password: result[1],
          zoneid: result[2]
        })
      } else {
        this.alertService.onCancel("Edit cancelled")
      }
    });
  }

  delete(user: User) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        mode: 'User',
        action: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id)
      } else {
        this.alertService.onCancel("Delete cancelled")
      }
    });
  }

  showPasswords: Map<string, boolean> = new Map();

  hidePassword(user: User){
    let res = this.showPasswords.get(user.id);
    if(res == null) {
      this.showPasswords.set(user.id, true);
    } else {
      this.showPasswords.set(user.id, !res);
    }
  }


}
