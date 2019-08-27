import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NbOAuth2AuthStrategy, NbTokenService } from '@nebular/auth';

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
    protected oauth2AuthStrategy: NbOAuth2AuthStrategy,
    protected tokenService: NbTokenService,
  ) {
  }

  ngOnInit(): void {
    // OAuth2 authorization code grant type is done by Passport from Nest server
    // The token passed from the server is not an OAuth2 token, it's a JWT token generated based on the OAuth2 logged in user
    // Here only need to save the JWT token and redirect to the home page
    if (isPlatformBrowser(this.platform)) {
      const accessToken = this.activatedRoute.snapshot.queryParams.accessToken;
      const token = this.oauth2AuthStrategy.createToken(accessToken, true);
      this.tokenService.set(token);
      const redirectUrl = this.oauth2AuthStrategy.getOption('token.redirectUri');
      this.router.navigateByUrl(redirectUrl);
    }
  }

}
