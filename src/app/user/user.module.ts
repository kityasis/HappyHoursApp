import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile.component';


@NgModule({
  imports: [    
    UserRoutingModule,
    CoreModule
  ],
  exports: [],
  declarations: [   
    UserProfileComponent
  ],
  providers: [],
  entryComponents: [
    UserProfileComponent
  ]
})
export class UserModule {}
