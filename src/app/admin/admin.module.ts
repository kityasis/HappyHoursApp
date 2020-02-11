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
import { BrowserModule, HAMMER_LOADER } from '@angular/platform-browser';
import { AdminRoutingModule } from './admin-routing.module';
import { DeleteDialogComponent } from './delete-dialog.component';
import { ManageShopsComponent } from './manage-shops.component';
import { ShopPermissionDialogComponent } from './shop-permissions-dialog.component';
import { CoreModule } from '../core/core.module';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



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
    MatPaginatorModule,
    MatSortModule, 
    AdminRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    ManageShopsComponent,
    ShopPermissionDialogComponent,
    DeleteDialogComponent  
  ],
  providers: [ManageShopsComponent,{
    provide: HAMMER_LOADER,
    useValue: () => new Promise(() => {})
  }],
  entryComponents: [  
    DeleteDialogComponent,
    ShopPermissionDialogComponent,
    ManageShopsComponent
  ]
})
export class AdminModule {}
