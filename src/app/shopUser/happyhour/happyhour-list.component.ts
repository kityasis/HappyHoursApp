
import { HappyHoursService } from './../../core/happyhours.service';
import { AddEditHappyHoursDialogComponent } from './add-edit-happyhours-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource,MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../shop/delete-dialog.component';

import { Utils } from '../../core/utils';
import { HappyHours } from '../../model/happy-hour';

@Component({
  selector: 'app-happyhour',
  templateUrl: 'happyhour-list.component.html',
  styleUrls: ['happyhour-list.component.scss']
})
export class HappyHourListComponent implements OnInit {
  displayedColumns = ["name","type","email","contactNumber","shopImages","actions"];
  error: string;
  dataSource = new MatTableDataSource();
  happyhours: HappyHours[];
  happyhour : HappyHours;

  constructor(
    private _happyhourService:HappyHoursService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._happyhourService.getAllHappyHours().subscribe(hphrs => {
      this.happyhours = hphrs;
      this.dataSource.data=hphrs;
    }, error => Utils.formatError(error));
  }

  addEditHappyHour(happyhour: HappyHours) {    
    const dialogRef = this.dialog.open(AddEditHappyHoursDialogComponent, {
      width: '348px',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {     
      if (result !== undefined) {
        this._happyhourService.addHappyHours(happyhour).subscribe(() => {          
          this._happyhourService.getHappyHours().subscribe(hphrs => {            
            this.dataSource.data = hphrs;
          }, error => this.error = Utils.formatError(error));
        }, error => this.error = Utils.formatError(error));
      }
    });
  }

  deleteShop(happyhours: HappyHours) {
     const dialogRef = this.dialog.open(DeleteDialogComponent, {
       width: '348px',
       data: { entityName: 'shop', message: `Are you sure you want to delete Shop ${happyhours.id}?` }
     });
     dialogRef.afterClosed().subscribe(result => {
       if (result !== undefined) {
         this._happyhourService.deleteHappyHours(happyhours).subscribe(() => {
           this.ngOnInit();
         }, error => this.error = Utils.formatError(error));
       }
     });
   }
}

