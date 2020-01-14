import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditShopComponent } from './add-edit-shop.component';

const routes: Routes = [{ path: 'add-edit-shop', component: AddEditShopComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule { }

//export const routedComponents = [ManageShopsComponent];