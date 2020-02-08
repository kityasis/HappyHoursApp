import { Component, OnInit, Inject } from '@angular/core';
import { UserPermission } from '../model/user-permission';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountService } from '../core/account.service';
import { ShopService } from '../core/shop.service';
import { Utils } from '../core/utils';
import { Shop } from '../model/shop';

@Component({
  selector: 'shop-permission-dialog',
  templateUrl: 'shop-permission-dialog.component.html'
})
export class ShopPermissionDialogComponent implements OnInit { 
  
  options = [{value: 'View', label: 'View' },{ value: 'Edit', label: 'Edit' }];

  permission: string;

  constructor(  
    public _dialogRef: MatDialogRef<ShopPermissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _shopService: ShopService
    ) { 
     this.permission=data.permission;      
    }

  ngOnInit() {    
  }
  save() {
    this._dialogRef.close();
  }
  cancel() {
    this._dialogRef.close();
  }
}
