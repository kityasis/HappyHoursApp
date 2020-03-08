
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ShopService } from '../../core/shop.service';
import { HappyHoursService } from '../../core/happyhours.service';
import { Utils } from '../../core/utils';

@Component({
    selector: 'app-add-edit-delete-dialog',
    templateUrl: 'add-edit-happyhours-dialog.component.html',
    styleUrls: ['add-edit-happyhours-dialog.component.scss']  
})

export class AddEditHappyHoursDialogComponent implements OnInit {
    confirmationMessage: string;
    ShopDDL : any;
    WeeksDDL:any;
    TimeDDL:any;
    error : string;
    constructor(public _dialogRef: MatDialogRef<AddEditHappyHoursDialogComponent>,
                @Inject(MAT_DIALOG_DATA) 
                public data: any,
                private _shopService: ShopService,
                private _happyHoursService: HappyHoursService) { 
                    this.confirmationMessage = data.message;
                }

    ngOnInit() {
        // this._shopService.getShopDDL().subscribe(s => {
        //     this.shopDLL = s;
        // }, error => (this.error = Utils.formatError(error)));

        this._happyHoursService.getHappyHours().subscribe(s => {
            this.ShopDDL=s.shopDDL;
            this.WeeksDDL=s.weeksDDL;
            this.TimeDDL=s.timeDDL;
        }, error => (this.error = Utils.formatError(error)));
     }
     save(){
         this._happyHoursService.addHappyHours(this.data).subscribe(s => {
            this._dialogRef.close();
        }, error => (this.error = Utils.formatError(error)));
     }
    cancel() {
        this._dialogRef.close();
    }
}