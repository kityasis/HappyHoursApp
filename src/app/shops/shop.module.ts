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

import { AddEditShopComponent } from './add-edit-shop.component';
import { DeleteDialogComponent } from './delete-dialog.component';
import { CoreModule } from '../core/core.module';
import { ShopRoutingModule } from './shop-routing.module';

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
    CoreModule,
    ShopRoutingModule
  ],
  exports: [],
  declarations: [
    AddEditShopComponent,
    DeleteDialogComponent,   
  ],
  providers: [],
  entryComponents: [
    DeleteDialogComponent   
  ]
})
export class ShopModule {}
