import { Component, OnInit, Inject } from '@angular/core';
import { UserProfile } from '../model/user-profile';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountService } from '../core/account.service';
import { ShopService } from '../core/shop.service';
import { UserPermission } from '../model/user-permission';
import { Utils } from '../core/utils';

@Component({
  selector: 'app-add-shop-user-dialog',
  templateUrl: 'add-shop-user-dialog.component.html'
})
export class AddShopUserDialogComponent implements OnInit {
  allUsers: UserProfile[];
  unassociatedUsers: UserProfile[] = [];
  selectedUser: any;
  permission = 'View';
  shopId: number;
  error: string;

  constructor(
    private _accountService: AccountService,
    public _dialogRef: MatDialogRef<AddShopUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _shopService: ShopService
  ) {
    this.shopId = data.ShopId;
  }

  ngOnInit() {
    this,
      this._accountService.getAllUsers().subscribe(allUsers => {
        this.allUsers = allUsers;
        this._shopService
          .getShopUsers(this.shopId)
          .subscribe(shopUsers => {
            this.allUsers.forEach(u => {
              const shopUser = shopUsers.find(pu => pu.id === u.id);
              if (!shopUser) { this.unassociatedUsers.push(u); }
            });
          });
      });
  }

  add() {
    if (!this.selectedUser) {
      this.error = 'You must select a user to add';
    } else {
      const perm = new UserPermission();
      perm.userProfileId = this.selectedUser.id;
      perm.value = this.permission;
      perm.shopId = this.shopId;
      this._shopService.addUserPermission(perm).subscribe(
        result => {
          this._dialogRef.close(true);
        },
        error => this.error = Utils.formatError(error)
      );
    }
  }

  cancel() {
    this._dialogRef.close();
  }

}
