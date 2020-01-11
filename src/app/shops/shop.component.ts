import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { DeleteDialogComponent } from '../admin/delete-dialog.component';
import { AccountService } from '../core/account.service';
import { ShopService } from '../core/shop.service';
import { Utils } from '../core/utils';
import { Milestone } from '../model/milestone';
import { MilestoneStatus } from '../model/milestone-status';
import { Shop } from '../model/shop';
import { AddEditMilestoneDialogComponent } from './add-edit-milestone-dialog.component';
import { AuthService } from '../core/auth-service.component';

@Component({
  selector: 'app-shop',
  templateUrl: 'shop.component.html',
  styleUrls: ['shop.component.scss']
})
export class ShopComponent implements OnInit {
  displayedColumns = ['name', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  milestones: Milestone[];
  milestoneStatuses: MilestoneStatus[];
  Shop: Shop;
  error: string;

  constructor(
    private _route: ActivatedRoute,
    private _ShopService: ShopService,
    private _acctService: AccountService,
    public dialog: MatDialog,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    var ShopId = this._route.snapshot.params.ShopId;
    this._ShopService.getMilestoneStatuses().subscribe(ms => {
      this.milestoneStatuses = ms;
    });
    this._ShopService.getShop(ShopId).subscribe(Shop => {
      this.Shop = Shop;
      this.milestones = Shop.milestones;
      this.dataSource.data = this.milestones;
    });
  }

  addMilestone() {
    var newMs = new Milestone();
    newMs.shopId = this.Shop.id;
    const dialogRef = this.dialog.open(AddEditMilestoneDialogComponent, {
      width: '348px',
      data: {
        milestone: newMs,
        milestoneStatuses: this.milestoneStatuses,
        defaultStatus: this.milestoneStatuses[0],
        mode: 'Add'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._ShopService.addMilestone(result).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  editMilestone(milestone: Milestone) {
    var clonedMilestone = JSON.parse(JSON.stringify(milestone));
    const dialogRef = this.dialog.open(AddEditMilestoneDialogComponent, {
      width: '348px',
      data: {
        milestone: clonedMilestone,
        milestoneStatuses: this.milestoneStatuses,
        defaultStatus: this.milestoneStatuses.find(ms => ms.id == milestone.milestoneStatusId)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._ShopService.updateMilestone(result).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  deleteMilestone(milestone: Milestone) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '348px',
      data: { entityName: 'Milestone', message: `Are you sure you want to delete milestone ${milestone.name}?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._ShopService.deleteMilestone(milestone.id).subscribe(() => {
          this.ngOnInit();
        }, error => this.error = Utils.formatError(error));
      }
    });

  }

  getStatusName(id: number) {
    if (!this.milestoneStatuses) return '';
    var status = this.milestoneStatuses.find(ms => ms.id == id);
    return status ? status.name : 'unknown';
  }

  canEditShop(): boolean {
    if (
      !this.Shop ||
      !this._authService.authContext ||
      !this._authService.authContext.userProfile ||
      !this._authService.authContext.userProfile.userPermissions
    ) {
      return false;
    }
    const editPerm = this._authService.authContext.userProfile.userPermissions.find(
      up => up.shopId === this.Shop.id && up.value === 'Edit'
    );
    return !!editPerm || this._authService.authContext.isAdmin;
  }
}
