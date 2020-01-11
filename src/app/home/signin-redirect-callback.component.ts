import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth-service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-callback',
  template: `<div></div>`
})

export class SigninRedirectCallbackComponent implements OnInit {
  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this._authService.completeLogin().then(user => {
      //check if user exist in API DB
      //if not then insert into UserProfile
      //Todo   
      this._router.navigate(['/'], { replaceUrl: true });
    })
  }
}