import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';

import {
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbAuthJWTToken,
  NbAuthJWTInterceptor,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
} from '@nebular/auth';

import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

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
import { RoleProvider } from './services/role-provider.service';
import { accessControl } from './access-control';

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

  NbSecurityModule.forRoot({
    accessControl,
  }).providers,
  {
    provide: NbRoleProvider,
    useClass: RoleProvider,
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
