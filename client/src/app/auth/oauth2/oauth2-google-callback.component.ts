import { Component, OnInit, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NbAuthResult, NbAuthService, NB_AUTH_OPTIONS, NbOAuth2AuthStrategy } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { NgxLoginComponent } from '../login/login.component';

@Component({
  template: `
    <nb-layout>
      <nb-layout-column>Login with Google...</nb-layout-column>
    </nb-layout>
  `,
})
export class OAuth2GoogleCallbackComponent extends NgxLoginComponent implements OnInit, OnDestroy {

  alive = true;

  constructor(protected service: NbAuthService,
      @Inject(NB_AUTH_OPTIONS) protected options = {},
      protected cd: ChangeDetectorRef,
      protected router: Router,
      protected oauth2Strategy: NbOAuth2AuthStrategy,
      protected http: HttpClient) {
    super(service, options, cd, router, oauth2Strategy);
  }

  ngOnInit(): void {
    this.service.authenticate('google')
      .pipe(takeWhile(() => this.alive))
      .subscribe(async (authResult: NbAuthResult) => {
        if (authResult.isSuccess() && authResult.getRedirect()) {
          // Get Google account profile
          const profile: any = await this.http
              .get('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses')
              .toPromise();
          this.user = {
            name: profile.names[0].displayName,
            email: profile.emailAddresses[0].value,
          };
          // In the real-world app we should register the user locally first before calling login
          this.login();
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
