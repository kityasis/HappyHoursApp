import { HappyHoursService } from './happyhours.service';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from './auth-service.component';
import { AccountService } from './account.service';
import { ShopService } from './shop.service';
import { AdminRouteGuard } from './admin-route-guard';
import { UserProfileService } from '../core/user-profile.service';
import { ItemService } from './item.service';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        AuthService,
        AccountService,        
        UserProfileService,     
        AdminRouteGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        ShopService,
        ItemService, 
        HappyHoursService
    ],
})
export class CoreModule { }
