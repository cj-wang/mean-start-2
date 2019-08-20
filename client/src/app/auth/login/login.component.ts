import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbLoginComponent, NbAuthResult, NbAuthService, NB_AUTH_OPTIONS, NbOAuth2AuthStrategy } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class NgxLoginComponent extends NbLoginComponent implements OnInit, OnDestroy {

  alive = true;

  user: any = {
    username: 'admin@email.com',
    password: 'password',
  };

  constructor(protected service: NbAuthService,
      @Inject(NB_AUTH_OPTIONS) protected options = {},
      protected cd: ChangeDetectorRef,
      protected router: Router,
      protected oauth2Strategy: NbOAuth2AuthStrategy) {
    super(service, options, cd, router);
  }

  ngOnInit(): void {
    // Prefix NbOAuth2AuthStrategy redirectUri with window.location.origin
    // This can be done at runtime only as window.location.origin is null during AoT build
    const oauth2Options = ((this.options as any).strategies as any[][]).filter(
      strategy => strategy[0] === NbOAuth2AuthStrategy,
    )[0][1];
    if ((oauth2Options.authorize.redirectUri as string).startsWith('/')) {
      oauth2Options.authorize.redirectUri = window.location.origin + oauth2Options.authorize.redirectUri;
      this.oauth2Strategy.setOptions(oauth2Options);
    }
  }

  googleLogin() {
    this.service.authenticate('google')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
