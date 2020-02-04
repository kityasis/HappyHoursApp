import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Constants } from '../constants';
import { Item } from '../model/item';
import { AuthService } from './auth-service.component';

@Injectable()
export class ItemService {
    constructor(private _httpClient: HttpClient,
                private _authService: AuthService) { }
    
    getItems(): Observable<Item[]> {
        return from(this._authService.getAccessToken().then(token => {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
            return this._httpClient.get<Item[]>(Constants.apiRoot + 'Items', {headers: headers}).toPromise();
        }));
    }

    getItem(itemId: number): Observable<Item> {
        return this._httpClient.get<Item>(Constants.apiRoot + 'Items/' + itemId);
    }    

    addItem(Item: Item): Observable<Item> {
        return this._httpClient.post<Item>(Constants.apiRoot + 'Items', Item);
    }
    updateItem(Item: Item) {
        return this._httpClient.put(`${Constants.apiRoot}Items/${Item.id}`, Item);
    }

    deleteItem(Item: Item): Observable<object> {
        return this._httpClient.delete(Constants.apiRoot + 'Items/' + Item.id);
    }   
}