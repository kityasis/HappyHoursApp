import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-add-shop-dialog',
    templateUrl: 'add-shop-dialog.component.html'
})

export class AddShopDialogComponent implements OnInit {
    error: string;
    constructor(public _dialogRef: MatDialogRef<AddShopDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() { }

    cancel() {
        this._dialogRef.close();
    }

    add() {
        if (this.data.name) { this._dialogRef.close(this.data.name); }
        else { this.error = "Please enter a name for the shop." };
    }
}