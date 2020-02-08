import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';

import { ShopService } from '../core/shop.service';
import { Utils } from '../core/utils';
import { Shop } from '../model/shop';
import { ShopPermissionDialogComponent } from './shop-permissions-dialog.component';
import { DeleteDialogComponent } from './delete-dialog.component';

@Component({
  selector: 'app-manage-shops',
  templateUrl: 'manage-shops.component.html',
  styleUrls: ['manage-shops.component.scss']
})
export class ManageShopsComponent implements OnInit {
  displayedColumns = ['name','email','locality', 'actions'];
  error: string;
  dataSource = new MatTableDataSource();
  shops: Shop[];

  constructor(
    private _shopservice: ShopService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._shopservice.getShops().subscribe(shops => {
      this.shops = shops;
      this.dataSource.data = shops;
    }, error => this.error = Utils.formatError(error));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  deleteShop(Shop: Shop) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '348px',
      data: { entityName: 'Shop', message: `Are you sure you want to delete Shop ${Shop.name}?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._shopservice.deleteShop(Shop).subscribe(() => {
          this.shops.splice(this.shops.indexOf(Shop), 1);
          this.dataSource.data = this.shops;
        }, error => this.error = Utils.formatError(error));
      }
    });
  }
  permission(Shop:Shop) {
    var perm = Shop.permission;
    const dialogRef = this.dialog.open(ShopPermissionDialogComponent, {
      width: '348px',
      data: { permission: perm, id: Shop.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.ngOnInit();
      }
    });
  }

}
