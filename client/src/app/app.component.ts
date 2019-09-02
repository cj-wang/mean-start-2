/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, PLATFORM_ID, Inject, Optional } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { NbPasswordAuthStrategy, NbTokenService } from '@nebular/auth';
import { AnalyticsService } from './@core/utils/analytics.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    @Optional() @Inject(REQUEST) private request: Request,
    protected authStrategy: NbPasswordAuthStrategy,
    protected tokenService: NbTokenService,
    private analytics: AnalyticsService,
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platform) && this.request) {
      this.tokenService.clear();
      const accessToken = this.request.cookies.accessToken;
      if (accessToken) {
        const token = this.authStrategy.createToken(accessToken, false);
        this.tokenService.set(token);
      }
    }
    this.analytics.trackPageViews();
  }
}
