import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AddShopDialogComponent } from './add-shop-dialog.component';
import { AddShopUserDialogComponent } from './add-shop-user-dialog.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DeleteDialogComponent } from './delete-dialog.component';
import { ManagePermissionsComponent } from './manage-permissions.component';
import { ManageShopsComponent } from './manage-shops.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    AdminRoutingModule,
    CoreModule
  ],
  exports: [],
  declarations: [
    ManageShopsComponent,
    ManagePermissionsComponent,
    AddShopDialogComponent,
    DeleteDialogComponent,
    AddShopUserDialogComponent
  ],
  providers: [],
  entryComponents: [
    AddShopDialogComponent,
    DeleteDialogComponent,
    AddShopUserDialogComponent
  ]
})
export class AdminModule {}
