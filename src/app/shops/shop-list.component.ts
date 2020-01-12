import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { ShopService } from '../core/shop.service';
import { Utils } from '../core/utils';
import { Shop } from '../model/shop';

@Component({
  selector: "app-shops",
  templateUrl: "shop-list.component.html",
  styleUrls: ['shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  displayedColumns = ["name","type","email","contactNumber","shopImages","actions"];
  error: string;
  dataSource = new MatTableDataSource();
  Shops: Shop[];

  constructor(private _shopService: ShopService) {}

  ngOnInit() {
    this._shopService.getShops().subscribe(Shops => {
      this.Shops = Shops;
      this.dataSource.data = Shops;
    }, error => Utils.formatError(error));
  }
}
