import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditShopComponent } from './add-edit-shop.component';
import { ShopListComponent } from './shop-list.component';
import { AddEditShopCanDeactivateGuardService } from './add-edit-can-deactivate-guard.service';

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
  { path: 'add-edit-item', component: ItemListComponent}   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule { }

//export const routedComponents = [ManageShopsComponent];