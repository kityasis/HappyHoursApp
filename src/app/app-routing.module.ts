import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './home/contact-us.component';
import { HomeComponent } from './home/home.component';
import { SigninRedirectCallbackComponent } from './home/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './home/signout-redirect-callback.component';
import { ShopListComponent } from './shops/shop-list.component';
import { ShopComponent } from './shops/shop.component';
import { UnauthorizedComponent } from './home/unauthorized.component';
import { UserProfileComponent } from './user/user-profile.component';
import { AddEditShopComponent } from './shops/add-edit-shop.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'shops', component: ShopListComponent},    
    { path: 'add-edit-shop/:shopId', component: AddEditShopComponent},
    { path: 'add-edit-shop', component: AddEditShopComponent},
    { path: 'shop/:shopId', component: ShopComponent },
    { path: 'signin-callback', component: SigninRedirectCallbackComponent },
    { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: 'user-profile', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
