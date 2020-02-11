import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


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
  displayedColumns = ['name','type','contact','email','locality','status', 'actions'];
  error: string;
  dataSource = new MatTableDataSource();
  shops: Shop[];
  searchKey:string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _shopservice: ShopService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._shopservice.getShops().subscribe(shops => {
      this.shops = shops;
      this.dataSource.data = shops;
    }, error => this.error = Utils.formatError(error));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
        this._shopservice.updateShopPermission(Shop.id,result).subscribe(() => {          
          this._shopservice.getShops().subscribe(shops => {            
            this.dataSource.data = shops;
          }, error => this.error = Utils.formatError(error));
        }, error => this.error = Utils.formatError(error));
      }
    });
  }
  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }
 
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();;
  }
}
