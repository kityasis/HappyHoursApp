import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Constants } from '../constants';

import { UserProfile } from '../model/user-profile';
import { AuthService } from './auth-service.component';

@Injectable()
export class UserProfileService {
    constructor(private _httpClient: HttpClient,
                private _authService: AuthService) { }
    
    getUserProfile(): Observable<UserProfile> {
        return from(this._authService.getAccessToken().then(token => {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
            return this._httpClient.get<UserProfile>(Constants.apiRoot + 'Account/UserProfile', {headers: headers}).toPromise();
        }));
    }
    updateUserProfile(userProfile: UserProfile) {
        return this._httpClient.put(`${Constants.apiRoot}Account/UserProfile/${userProfile.id}`, userProfile);
    }
    upload(formData){
        return this._httpClient.post<any>(`${Constants.apiRoot}Account/Upload`, formData, {
            reportProgress: true,  
            observe: 'events'  
        });       
    }
}