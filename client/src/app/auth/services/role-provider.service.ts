import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import { NbAuthService } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';

@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string[]> {
    return this.authService.isAuthenticatedOrRefresh().pipe(
      switchMap(authenticated => this.authService.onTokenChange().pipe(
        map(token => token.isValid() ? token.getPayload().roles : ['guest']),
      )),
    );
  }
}
