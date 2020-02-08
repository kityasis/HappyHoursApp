import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageShopsComponent } from './manage-shops.component';
import { AdminRouteGuard } from '../core/admin-route-guard';

const routes: Routes = [
  { path: 'admin', component: ManageShopsComponent,
      canActivate: [AdminRouteGuard] } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

export const routedComponents = [ManageShopsComponent];