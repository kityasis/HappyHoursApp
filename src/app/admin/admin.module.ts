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
import { AdminRoutingModule } from './admin-routing.module';
import { DeleteDialogComponent } from './delete-dialog.component';
import { ManageShopsComponent } from './manage-shops.component';
import { ShopPermissionDialogComponent } from './shop-permissions-dialog.component';
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
    ShopPermissionDialogComponent,
    DeleteDialogComponent  
  ],
  providers: [],
  entryComponents: [  
    DeleteDialogComponent,
    ShopPermissionDialogComponent
  ]
})
export class AdminModule {}
