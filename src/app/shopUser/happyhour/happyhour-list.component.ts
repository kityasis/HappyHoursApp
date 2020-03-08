
import { HappyHoursService } from './../../core/happyhours.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource,MatDialog } from '@angular/material';
import { AddEditHappyHoursDialogComponent } from './add-edit-happyhours-dialog.component';
import { DeleteDialogComponent } from '../shop/delete-dialog.component';

import { Utils } from '../../core/utils';
import { HappyHours } from '../../model/happy-hour';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-happyhour',
  templateUrl: 'happyhour-list.component.html',
  styleUrls: ['happyhour-list.component.scss']
})
export class HappyHourListComponent implements OnInit {
  displayedColumns = ["name","day","starttime","endtime","date","actions"];
  error: string;
  dataSource = new MatTableDataSource();
  happyhours: HappyHours[];
  happyhour : HappyHours;
  searchKey:string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private _happyhourService:HappyHoursService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._happyhourService.getAllHappyHours().subscribe(hphrs => {
      this.happyhours = hphrs;
      this.dataSource.data=hphrs;
      console.log(hphrs);
    }, error => Utils.formatError(error));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  deleteHappyhour(happyhours: HappyHours) {
     const dialogRef = this.dialog.open(DeleteDialogComponent, {
       width: '348px',
       data: { entityName: 'shop', message: `Are you sure you want to delete Shop ${happyhours.id}?` }
     });
     dialogRef.afterClosed().subscribe(result => {
       if (result !== undefined) {
         this._happyhourService.deleteHappyhour(happyhours).subscribe(() => {
           this.ngOnInit();
         }, error => this.error = Utils.formatError(error));
       }
     });
   }

   onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }
 
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();;
  }
}

