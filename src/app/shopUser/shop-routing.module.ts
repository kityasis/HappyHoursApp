import { AddEditHappyHoursDialogComponent } from './happyhour/add-edit-happyhours-dialog.component';
import { HappyHourListComponent } from './happyhour/happyhour-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditShopComponent } from './shop/add-edit-shop.component';
import { ShopListComponent } from './shop/shop-list.component';
import { AddEditShopCanDeactivateGuardService } from './shop/add-edit-can-deactivate-guard.service';

import { ItemListComponent } from './item/item-list.component';

const routes: Routes = [ 
  { path: 'shops', component: ShopListComponent},    
  { path: 'add-edit-shop/:shopId', component: AddEditShopComponent},
  { 
    path: 'add-edit-shop', 
    component: AddEditShopComponent,
    canDeactivate:[AddEditShopCanDeactivateGuardService]
  },
  { path: 'items', component: ItemListComponent},    
  { path: 'add-edit-item/:itemId', component: ItemListComponent},
  { path: 'add-edit-item', component: ItemListComponent}   ,
  { path: 'add-edit-happyhours', component: AddEditHappyHoursDialogComponent},
  { path: 'happyhours', component: HappyHourListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule { }

//export const routedComponents = [ManageShopsComponent];