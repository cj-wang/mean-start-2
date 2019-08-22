import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';

import {
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbOAuth2AuthStrategy,
  NbAuthJWTToken,
  NbAuthJWTInterceptor,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
} from '@nebular/auth';

import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NgxLoginComponent } from './login/login.component';
import { NgxOAuth2CallbackComponent } from './oauth2/oauth2-callback.component';

export const AUTH_PROVIDERS = [
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: 'api/auth/',
        token: {
          class: NbAuthJWTToken,
          key: 'accessToken',
        },
      }),
      // OAuth2 authorization code grant type is done by Passport from Nest server
      // The token passed from the server is not an OAuth2 token, it's a JWT token generated based on the OAuth2 logged in user
      // Here the NbOAuth2AuthStrategy is only used by NgxOAuth2CallbackComponent to save the JWT token and redirect to the home page
      NbOAuth2AuthStrategy.setup({
        name: 'oauth2',
        clientId: '',
        clientSecret: '',
        token: {
          class: NbAuthJWTToken,
          redirectUri: '/',
        },
      }),
    ],
  }).providers,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NbAuthJWTInterceptor,
    multi: true,
  },
  {
    provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
    useValue: tokenInterceptorFilter,
  },
];

export function tokenInterceptorFilter(req: HttpRequest<any>) {
  if (req.url === 'api/auth/login' || req.url === 'api/auth/refresh-token') {
    return true;
  }
  return false;
}

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    RouterModule,
    FormsModule,
    NbIconModule,
    NbAuthModule,
    NgxAuthRoutingModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [
    NgxLoginComponent,
    NgxOAuth2CallbackComponent,
  ],
})
export class NgxAuthModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: NgxAuthModule,
      providers: [
        ...AUTH_PROVIDERS,
      ],
    };
  }
}
