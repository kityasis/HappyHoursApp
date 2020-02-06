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

import { ShopListComponent } from './shop-list.component';
import { AddEditShopComponent } from './add-edit-shop.component';
import { DeleteDialogComponent } from './delete-dialog.component';
import { CoreModule } from '../core/core.module';
import { ShopRoutingModule } from './shop-routing.module';
import { AddEditShopCanDeactivateGuardService } from './add-edit-can-deactivate-guard.service';

import { ItemListComponent } from './item/item-list.component';

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
    ShopListComponent,
    AddEditShopComponent,
    DeleteDialogComponent,
    ItemListComponent   
  ],
  providers: [AddEditShopCanDeactivateGuardService],
  entryComponents: [
    DeleteDialogComponent   
  ]
})
export class ShopModule {}
