import { HappyHours } from './../model/happy-hour';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Constants } from '../constants';
import { AuthService } from './auth-service.component';

@Injectable()
export class HappyHoursService {
    constructor(private _httpClient: HttpClient,
                private _authService: AuthService) { }
    
    getHappyHours(): Observable<any> {

            return this._httpClient.get<any>(Constants.apiRoot + 'HappyHours/GetHappyHours');
    }

    getAllHappyHours(): Observable<HappyHours[]> {
        return this._httpClient.get<HappyHours[]>(Constants.apiRoot + 'HappyHours/GetAllHappyHours');
    }    

    addHappyHours(happyhour: HappyHours): Observable<HappyHours> {
        return this._httpClient.post<HappyHours>(Constants.apiRoot + 'HappyHours/AddHappyHours', happyhour);
    }
    updateItem(happyhour: HappyHours) {
        return this._httpClient.put(`${Constants.apiRoot}Items/${happyhour.id}`, happyhour);
    }

    deleteHappyhour(happyhour: HappyHours): Observable<object> {
        return this._httpClient.delete(Constants.apiRoot + 'HappyHours/' + happyhour.id);
    }   
}