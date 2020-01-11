import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AccountService } from '../core/account.service';
import { ShopService } from '../core/shop.service';
import { Utils } from '../core/utils';
import { Shop } from '../model/shop';
import { UserProfile } from '../model/user-profile';
import { AddShopUserDialogComponent } from './add-shop-user-dialog.component';
import { DeleteDialogComponent } from './delete-dialog.component';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: 'manage-permissions.component.html',
  styleUrls: ['manage-permissions.component.scss']
})
export class ManagePermissionsComponent implements OnInit {
  shopId: number;
  shop: Shop;
  users: any[] = [];
  displayedColumns = ['username', 'email', 'permission', 'actions'];
  error: string;
  dataSource = new MatTableDataSource();

  constructor(
    private _route: ActivatedRoute,
    private _accountService: AccountService,
    private _shopService: ShopService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.shopId = parseInt(this._route.snapshot.params.shopId);

    this._shopService.getShop(this.shopId).subscribe(s => {
      this.shop = s;
      this._accountService.getAllUsers().subscribe(users => {
        this._shopService
          .getShopUsers(this.shopId)
          .subscribe(users => {
            this.users = users;
            this.users.forEach(u => {
              if (u.userPermissions) {
                u.permission = u.userPermissions.find(up => up.ShopId === this.shopId);
              }
            });
            this.dataSource.data = users;
          }, error => (this.error = Utils.formatError(error)));
      }, error => (this.error = Utils.formatError(error)));
    }, error => (this.error = Utils.formatError(error)));
  }

  addUser() {
    const dialogRef = this.dialog.open(AddShopUserDialogComponent, {
      width: '348px',
      data: { ShopId: this.shopId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.ngOnInit();
      }
    });
  }

  removeUser(user: UserProfile) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '348px',
      data: {
        entityName: 'User',
        message: `Are you sure you want to remove user ${user.firstName} ${user.lastName} from this Shop?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._shopService
          .removeUserPermission(user.id, this.shopId)
          .subscribe(() => {
            this.users.splice(this.users.indexOf(u => u.id === user.id), 1);
            this.dataSource.data = this.users;
          }, error => (this.error = Utils.formatError(error)));
      }
    });
  }

  onPermissionChanged(user: any) {
    this._shopService.updateUserPermission(user.permission).subscribe(() => {

    }, error => { this.error = Utils.formatError(error)});
  }
}
