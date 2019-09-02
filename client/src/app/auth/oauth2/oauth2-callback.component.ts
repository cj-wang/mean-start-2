import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NbPasswordAuthStrategy, NbTokenService } from '@nebular/auth';

@Component({
  template: `
    <div>Logging in, please wait...</div>
  `,
})
export class NgxOAuth2CallbackComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected authStrategy: NbPasswordAuthStrategy,
    protected tokenService: NbTokenService,
  ) {
  }

  ngOnInit(): void {
    // OAuth2 authorization code grant type is done by Passport from Nest server
    // The token passed from the server is not an OAuth2 token, it's a JWT token generated based on the OAuth2 logged in user
    // Here only need to save the JWT token and redirect to the home page
    if (isPlatformBrowser(this.platform)) {
      const accessToken = this.activatedRoute.snapshot.queryParams.accessToken;
      const token = this.authStrategy.createToken(accessToken, true);
      this.tokenService.set(token);
      const redirect = sessionStorage.getItem('redirectUrl') || this.authStrategy.getOption('login.redirect.success');
      sessionStorage.removeItem('redirectUrl');
      if (redirect) {
        this.router.navigateByUrl(redirect);
      }
    }
  }

}
