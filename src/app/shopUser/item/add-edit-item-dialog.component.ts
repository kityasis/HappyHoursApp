import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ShopService } from '../../core/shop.service';
import { ItemService } from '../../core/item.service';
import { Utils } from '../../core/utils';

@Component({
    selector: 'app-add-edit-delete-dialog',
    templateUrl: 'add-edit-item-dialog.component.html',
    styleUrls: ['add-edit-item-dialog.component.scss']  
})

export class AddEditItemDialogComponent implements OnInit {
    confirmationMessage: string;
    shopDLL : any;
    error : string;
    checked = false;
    indeterminate = false;
    labelPosition = 'after';
    disabled = false;
    constructor(public _dialogRef: MatDialogRef<AddEditItemDialogComponent>,
                @Inject(MAT_DIALOG_DATA) 
                public data: any,
                private _shopService: ShopService,
                private _itemService: ItemService) { 
                    this.confirmationMessage = data.message;
                }

    ngOnInit() {
        this._shopService.getShopDDL().subscribe(s => {
            this.shopDLL = s;
        }, error => (this.error = Utils.formatError(error)));
     }
      save(){
          //this._itemService.addItem(this.data).subscribe(s => {
             
             this._dialogRef.close(this.data);
         //}, error => (this.error = Utils.formatError(error)));
      }
    cancel() {
        this._dialogRef.close();
    }
}