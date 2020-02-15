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
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { ShopListComponent } from './shop/shop-list.component';
import { AddEditShopComponent } from './shop/add-edit-shop.component';
import { DeleteDialogComponent } from './shop/delete-dialog.component';
import { CoreModule } from '../core/core.module';
import { ShopRoutingModule } from './shop-routing.module';
import { AddEditShopCanDeactivateGuardService } from './shop/add-edit-can-deactivate-guard.service';

import { ItemListComponent } from './item/item-list.component';
import { AddEditItemDialogComponent } from './item/add-edit-item-dialog.component';

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
    ShopRoutingModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [],
  declarations: [
    ShopListComponent,
    AddEditShopComponent,
    DeleteDialogComponent,
    AddEditItemDialogComponent,
    ItemListComponent   
  ],
  providers: [AddEditShopCanDeactivateGuardService],
  entryComponents: [
    DeleteDialogComponent,
    AddEditItemDialogComponent   
  ]
})
export class ShopModule {}
