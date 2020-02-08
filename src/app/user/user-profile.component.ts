import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';


import { UserProfile } from '../model/user-Profile';
import { UserProfileService } from '../core/user-profile.service';
import { map } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';


@Component({
    selector: "app-user-profile",
    templateUrl: "user-profile.component.html",
    styleUrls: ['user-profile.component.scss']
  })

export class UserProfileComponent implements OnInit {
    userProfile : UserProfile;
    error : string;
    isEdit : boolean;
    constructor(
       private _userProfileService: UserProfileService      
       ){}

    ngOnInit() {        
        this._userProfileService.getUserProfile().subscribe(up => {
          this.userProfile = up;
        });
        this.isEdit = true;       
      }
      updateUserProfile(userProfile:UserProfile):void{
        this._userProfileService.updateUserProfile(this.userProfile).subscribe(()=>this.userProfile);
      }
       edit(){
        this.isEdit = false;
       }
       cancel(){
        this.isEdit = true;
       }
       Update(userProfile){
         this.updateUserProfile(this.userProfile);
       }
       uploadFile(file){
        // const formData = new FormData();  
        // formData.append('file', file.data);  
        // file.inProgress = true;  
        // this._userProfileService.upload(formData).pipe(  
        //   map(event => {  
        //     switch (event.type) {  
        //       case HttpEventType.UploadProgress:  
        //         file.progress = Math.round(event.loaded * 100 / event.total);  
        //         break;  
        //       case HttpEventType.Response:  
        //         return event;  
        //     }  
        //    })//,  
          // catchError((error: HttpErrorResponse) => {  
          //   file.inProgress = false;  
          //   return of(`${file.data.name} upload failed.`);  
          // })).subscribe((event: any) => {  
          //   if (typeof (event) === 'object') {  
          //     console.log(event.body);  
          //   }  
          // });  
       }
}