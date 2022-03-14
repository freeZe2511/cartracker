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
  public hide = true;
  public showPasswords: Map<string, boolean> = new Map();

  /**
   * List of displayed columns from MatTable
   */
  displayedColumns: string[] = ['id', 'username', 'password', 'zone', 'status', 'position', 'created', 'actions'];
  dataSource = new MatTableDataSource(this.userService.users);

  /**
   * Init Users and call update loop
   */
  ngOnInit(): void {
    // this.mapService.initZones();
    this.initUsers();
    this.updateUsers();
  }

  /**
   * Unsubscribe from update loop after destruction
   */
  ngOnDestroy(): void {
    if (this.timeInterval) {
      this.timeInterval.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Initial subscription to get Users for Table
   */
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

  /**
   * Updating subscription loop to get updated data for Table
   */
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

  /**
   * Returns status string based on last position data
   * @param user
   */
  returnStatus(user: User) {
    if(user.latestPositions != undefined && user.latestPositions![0] != undefined) {
      return user.latestPositions![0].isMoving ? "Active" : "Inactive"
    } else {
      return "No Pos"
    }
  }

  /**
   * Returns status color based on last position data
   * @param user
   */
  returnStatusColor(user: User){
    if(user.latestPositions != undefined && user.latestPositions![0] != undefined) {
      return user.latestPositions[0].isMoving ? "#67ce00" : "#ff0000"
    } else {
      return "#ffa347"
    }
  }

  /**
   * Returns position string based on last position data
   * @param user
   */
  returnPos(user: User) {
    if(user.latestPositions != undefined && user.latestPositions![0] != undefined) {
      let lat = user.latestPositions[0].lat;
      let lng = user.latestPositions[0].lng;
      return lat + ", " + lng
    } else {
      return "No Pos"
    }
  }

  /**
   * Returns zone color based on last position data
   * @param user
   */
  returnZoneColor(user: User){
    if(user.latestPositions != undefined && user.latestPositions![0] != undefined) {
      return user.latestPositions[0].inZone ? "#67ce00" : "#ff0000"
    } else {
      return "#111111"
    }
  }


  /**
   * Opens dialog to fill in new user data and calls userService to create user
   * @param user
   */
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

  /**
   * Centers user on map to follow
   * @param user
   */
  centerOnUser(user: User) {
    this.router.navigate(['map']).then(() => this.mapService.setFollows(user));
  }

  /**
   * Opens dialog to edit user data and calls userService to edit user
   * @param user
   */
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

  /**
   * Opens dialog to delete user and calls userService to delete user
   * @param user
   */
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

  /**
   * Toggles password visibility of user
   * @param user
   */
  hidePassword(user: User){
    let res = this.showPasswords.get(user.id);
    if(res == null) {
      this.showPasswords.set(user.id, true);
    } else {
      this.showPasswords.set(user.id, !res);
    }
  }


}
