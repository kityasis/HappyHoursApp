import { Component, OnInit } from '@angular/core';
import { MatTableDataSource,MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog.component';

import { ItemService } from '../../core/item.service';
import { Utils } from '../../core/utils';
import { Item } from '../../model/item';

@Component({
  selector: 'app-item',
  templateUrl: 'item-list.component.html',
  styleUrls: ['item-list.component.scss']
})
export class HappyHourListComponent implements OnInit {
  displayedColumns = ["name","type","email","contactNumber","shopImages","actions"];
  error: string;
  dataSource = new MatTableDataSource();
  items: Item[];
  item : Item;

  constructor(
    private _itemService: ItemService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._itemService.getItems().subscribe(items => {
      this.items = items;
      this.dataSource.data = items;
    }, error => Utils.formatError(error));
  }

  deleteShop(item: Item) {
     const dialogRef = this.dialog.open(DeleteDialogComponent, {
       width: '348px',
       data: { entityName: 'shop', message: `Are you sure you want to delete Shop ${item.name}?` }
     });
     dialogRef.afterClosed().subscribe(result => {
       if (result !== undefined) {
         this._itemService.deleteItem(item).subscribe(() => {
           this.ngOnInit();
         }, error => this.error = Utils.formatError(error));
       }
     });
   }
}

