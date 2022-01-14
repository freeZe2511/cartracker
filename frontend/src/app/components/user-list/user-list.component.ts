import {Component, OnInit, ViewChild} from '@angular/core';
import {Position, User} from "../../shared/models/user";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {interval, Subscription, switchMap} from "rxjs";
import {UserService} from "../../shared/services/users/users.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditUserModalComponent} from "../edit-user-modal/edit-user-modal.component";
import {AddUserModalComponent} from "../add-user-modal/add-user-modal.component";
import {MapService} from "../../shared/services/map/map.service";
import {Router} from "@angular/router";
import {ConfirmService} from "../../shared/services/confirm/confirm.service";
import {AlertsService} from "../../shared/services/alerts/alerts.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  timeInterval!: Subscription;

  constructor(private _user: UserService, private modalService: NgbModal, private mapService: MapService,
              public router: Router,
              public _confirm: ConfirmService,
              public _alert: AlertsService) {
  }

  ngOnInit(): void {
    this.initUsers();

    this.mapService.getZones();

    this.updateUsersEverySecond();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private initUsers() {
    this._user.getUsersList().subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
        this._user.users = res;
        // console.log(this.mapService.zones)
      },
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  private updateUsersEverySecond() {
    this.timeInterval = interval(1000).pipe(
      switchMap(() => this._user.getUsersList()),
    ).subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
        this._user.users = res;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  public centerOnUser(userid: string, pos: Position) {
    this.mapService.centerOnMarker(userid, pos);
    this.router.navigate(['map']);

    // this.router.navigate(['map']).then(() => this.mapService.centerOnMarker(userid, pos));
  }

  public async add() {
    const modalReference = this.modalService.open(AddUserModalComponent);

    try {
      const resultUser: User = await modalReference.result;
      this._user.createUser(resultUser);
    } catch (error) {
      console.log(error);
    }
  }

  public async edit(user: User) {
    const modalReference = this.modalService.open(EditUserModalComponent);
    modalReference.componentInstance.user = user;

    try {
      const resultUser: User = await modalReference.result;
      this._user.updateUser(resultUser);
    } catch (error) {
      console.log(error);
    }
  }

  public async delete(userid: string) {
    this._confirm.confirmDialog().then((res) => {
      if(res){
        this._user.deleteUser(userid);
      } else {
        this._alert.onCancel("Deleting User cancelled");
      }
    });
  }

  displayedColumns: string[] = ['id', 'username', 'password', 'zone', 'status', 'created', 'actions'];
  dataSource = new MatTableDataSource(this._user.users);

  public findZoneName(user_zoneid: string) {
    return this.mapService.zones.find(z => z.id === user_zoneid)?.name;
  }

  public convertTime(id: any) {
    let timeStamp = parseInt(id.substr(0, 8), 16) * 1000
    return new Date(timeStamp)  // TODO refactor into nice format
  }

}
