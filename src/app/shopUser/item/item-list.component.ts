import { Component, OnInit } from '@angular/core';
import { MatTableDataSource,MatDialog } from '@angular/material';
import { AddEditItemDialogComponent } from './add-edit-item-dialog.component';
import { DeleteItemDialogComponent } from './delete-item-dialog.component';

import { ItemService } from '../../core/item.service';
import { Utils } from '../../core/utils';
import { Item } from '../../model/item';

@Component({
  selector: 'app-item',
  templateUrl: 'item-list.component.html',
  styleUrls: ['item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  displayedColumns = ["shopName","name","qty","price","actions"];
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
  addEditItem(item: Item) {    
    const dialogRef = this.dialog.open(AddEditItemDialogComponent, {
      width: '348px',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {     
      if (result !== undefined) {
        const newItem = new Item();
        newItem.name = result.name;
        newItem.price=result.price;
        newItem.qty=result.qty;
        newItem.shopId=result.shopId;
        newItem.isHappyHour=result.isHappyHour;
        this._itemService.addItem(newItem).subscribe(item => {          
         this.items.push(item);
         this.dataSource.data=this.items;
        }, error => this.error = Utils.formatError(error));
      }
    });
  }

  deleteShop(item: Item) {
     const dialogRef = this.dialog.open(DeleteItemDialogComponent, {
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

