import { Component, OnInit } from '@angular/core';
import { MatTableDataSource,MatDialog } from '@angular/material';
import { DeleteDialogComponent } from './delete-dialog.component';

import { ShopService } from '../core/shop.service';
import { Utils } from '../core/utils';
import { Shop } from '../model/shop';

@Component({
  selector: 'app-shops',
  templateUrl: 'shop-list.component.html',
  styleUrls: ['shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  displayedColumns = ["name","type","email","contactNumber","shopImages","actions"];
  error: string;
  dataSource = new MatTableDataSource();
  Shops: Shop[];
  shop : Shop;

  constructor(
    private _shopService: ShopService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._shopService.getShops().subscribe(Shops => {
      this.Shops = Shops;
      this.dataSource.data = Shops;
    }, error => Utils.formatError(error));
  }

  deleteShop(shop: Shop) {
     const dialogRef = this.dialog.open(DeleteDialogComponent, {
       width: '348px',
       data: { entityName: 'shop', message: `Are you sure you want to delete Shop ${shop.name}?` }
     });
     dialogRef.afterClosed().subscribe(result => {
       if (result !== undefined) {
         this._shopService.deleteShop(shop).subscribe(() => {
           this.ngOnInit();
         }, error => this.error = Utils.formatError(error));
       }
     });
   }
}

