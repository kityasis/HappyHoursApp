import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Constants } from '../constants';
import { Milestone } from '../model/milestone';
import { MilestoneStatus } from '../model/milestone-status';
import { Shop } from '../model/shop';
import { UserPermission } from '../model/user-permission';
import { UserProfile } from '../model/user-profile';
import { CoreModule } from './core.module';
import { AuthService } from './auth-service.component';


@Injectable()
export class ShopService {
    constructor(private _httpClient: HttpClient,
                private _authService: AuthService) { }
    
    getShops(): Observable<Shop[]> {
        return from(this._authService.getAccessToken().then(token => {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
            return this._httpClient.get<Shop[]>(Constants.apiRoot + 'Shops', {headers: headers}).toPromise();
        }));
    }

    getShop(shopId: number): Observable<Shop> {
        return this._httpClient.get<Shop>(Constants.apiRoot + 'Shops/' + shopId);
    }

    getShopUsers(ShopId: number): Observable<UserProfile[]> {
        return this._httpClient.get<UserProfile[]>(Constants.apiRoot + 'Shops/' + ShopId + '/Users');
    }

    addShop(Shop: Shop): Observable<Shop> {
        return this._httpClient.post<Shop>(Constants.apiRoot + 'Shops', Shop);
    }
    updateShop(shop: Shop) {
        return this._httpClient.put(`${Constants.apiRoot}Shops/${shop.id}`, shop);
    }

    deleteShop(shop: Shop): Observable<object> {
        return this._httpClient.delete(Constants.apiRoot + 'Shops/' + shop.id);
    }

    addUserPermission(userPermission: UserPermission) {
        return this._httpClient.post(Constants.apiRoot + 'UserPermissions', userPermission);
    }

    removeUserPermission(userId: string, ShopId: number) {
        return this._httpClient.delete(`${Constants.apiRoot}UserPermissions/?userId=${userId}&ShopId=${ShopId}`);
    }

    updateUserPermission(userPermission) {
        return this._httpClient.put(`${Constants.apiRoot}UserPermissions`, userPermission);
    }

    getMilestones(ShopId: number): Observable<Milestone[]> {
        return this._httpClient.get<Milestone[]>(Constants.apiRoot + 'Milestone');
    }

    getMilestoneStatuses() {
        return this._httpClient.get<MilestoneStatus[]>(`${Constants.apiRoot}Shops/MilestoneStatuses`);
    }

    addMilestone(milestone: Milestone) {
        return this._httpClient.post(`${Constants.apiRoot}Shops/Milestones`, milestone);
    }

    deleteMilestone(id: number) {
        return this._httpClient.delete(`${Constants.apiRoot}Shops/Milestones/${id}`);
    }

    updateMilestone(milestone: Milestone) {
        return this._httpClient.put(`${Constants.apiRoot}Shops/Milestones/${milestone.id}`, milestone);
    }
}