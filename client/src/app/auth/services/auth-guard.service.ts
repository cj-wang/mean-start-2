import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NbAuthService } from '@nebular/auth';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    private authService: NbAuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (isPlatformBrowser(this.platform)) {
      return this.authService.isAuthenticatedOrRefresh().pipe(
        tap(authenticated => {
          if (!authenticated) {
            sessionStorage.setItem('redirectUrl', state.url);
            this.router.navigate(['auth/login']);
          }
        }),
      );
    } else {
      return true;
    }
  }
}
