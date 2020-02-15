import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-add-edit-delete-dialog',
    templateUrl: 'add-edit-item-dialog.component.html'
})

export class AddEditItemDialogComponent implements OnInit {
    confirmationMessage: string;
    constructor(public _dialogRef: MatDialogRef<AddEditItemDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { 
                    this.confirmationMessage = data.message;
                }

    ngOnInit() { }

    cancel() {
        this._dialogRef.close();
    }
}