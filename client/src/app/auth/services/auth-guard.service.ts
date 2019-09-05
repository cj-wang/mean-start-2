import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    private authService: NbAuthService,
    private accessChecker: NbAccessChecker,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticatedOrRefresh().pipe(
      tap(authenticated => {
        if (! authenticated) {
          if (isPlatformBrowser(this.platform)) {
            sessionStorage.setItem('redirectUrl', state.url);
          }
          this.router.navigate(['auth/login']);
        }
      }),
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (childRoute.data.isGranted) {
      return this.accessChecker.isGranted(childRoute.data.isGranted[0], childRoute.data.isGranted[1]).pipe(
        tap(granted => {
          if (! granted) {
            if (isPlatformBrowser(this.platform)) {
              sessionStorage.setItem('redirectUrl', state.url);
            }
            this.router.navigate(['auth/login']);
          }
        }),
      );
    } else {
      return true;
    }
  }
}
