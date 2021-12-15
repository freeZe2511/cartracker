import {Component, OnInit, ViewChild} from '@angular/core';
import {Position, User} from "../models/user";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {interval, Subscription, switchMap} from "rxjs";
import {UserService} from "../services/users.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditUserModalComponent} from "../edit-user-modal/edit-user-modal.component";
import {AddUserModalComponent} from "../add-user-modal/add-user-modal.component";
import {MapService} from "../services/map.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  timeInterval!: Subscription;

  constructor(private _user: UserService, private modalService: NgbModal, public mapService: MapService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.initUsers();

    this.updateUsersEverySecond();
  }

  ngAfterViewInit() {
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
    this._user.deleteUser(userid);
  }

  displayedColumns: string[] = ['id', 'username', 'password', 'zone', 'status', 'created', 'actions'];
  dataSource = new MatTableDataSource(this._user.users);

  public findZoneName(user_zoneid: string) { // TODO racing condition???
    return this.mapService.zones.find(z => z.id === user_zoneid)?.name;
  }

}
